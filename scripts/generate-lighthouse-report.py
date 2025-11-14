import json
import os
import glob
from urllib.parse import urlparse

# Define paths
TREEMAP_FOLDER = "./.lighthouseci"
PROD_OUTPUT_FILE_PATH = "prod-lighthouse-report.md"

important_paths = {"/", "/consulting/net-upgrade", "/consulting/web-applications"}
github_output = os.getenv('GITHUB_OUTPUT')
github_event = os.getenv('GITHUB_EVENT_NAME')

def format_url_for_filename(url):
    """Formats the URL to match the filename pattern by removing 'https://' and replacing slashes and dots."""
    formatted_url = url.replace("https://", "").replace("http://", "")
    return formatted_url.replace("-", "_").replace("/", "-_",1).replace("/", "_").replace(".", "_")

def get_total_and_unused_bytes_for_url(url, treemap_folder):
    """Reads the corresponding JSON file for the URL and calculates total and unused bytes in MB."""
    try:
        formatted_url = format_url_for_filename(url)
        filename_pattern = formatted_url + "*.report.json"

        print(f"🔍 Searching for {filename_pattern} in {treemap_folder}...")

        matching_files = glob.glob(os.path.join(treemap_folder, filename_pattern))

        if not matching_files:
            print(f"❌ Error: No matching JSON file found for {url}.")
            return 0, 0

        treemap_data_file = matching_files[0]
        with open(treemap_data_file, "r", encoding="utf-8") as file:
            data = json.load(file)

        script_data = data.get("audits", {}).get("script-treemap-data", {})
        nodes = script_data.get("details", {}).get("nodes", [])

        total_bytes = sum(node.get("resourceBytes", 0) for node in nodes)
        unused_bytes = sum(node.get("unusedBytes", 0) for node in nodes)

        return total_bytes / 1048576, unused_bytes / 1048576  # Convert bytes to MB

    except FileNotFoundError:
        print(f"❌ Error: {treemap_data_file} not found.")
        return 0, 0
    except json.JSONDecodeError:
        print(f"❌ Error: Failed to parse {treemap_data_file}.")
        return 0, 0

def extract_path(url):
    if url.startswith("⭐ "):
        url = url[2:]
    parsed_url = urlparse(url)
    return parsed_url.path

def get_score_display(score, difference):
    if (difference > 0):
        return f"{int(score)} (⬇️{abs(difference)})"
    elif (difference < 0):
        return f"{int(score)} (⬆️{abs(difference)})"
    else:
        return f"{int(score)}"

def get_display_text(prod_score, pr_score):
    difference = int(prod_score) - int(pr_score)
    return get_score_display(pr_score, difference)

def get_bundle_display(size, difference):
    difference = round(difference, 2)
    if difference > 0:
        return f"{size:.2f} MB (⬇️{abs(difference):.2f} MB)"
    elif difference < 0:
        return f"{size:.2f} MB (⬆️{abs(difference):.2f} MB)"
    else:
        return f"{size:.2f} MB"

def parse_prod_report():
    scores = {}

    try:
        with open(PROD_OUTPUT_FILE_PATH, 'r', encoding='utf-8') as file:
            lines = file.read().strip().split('\n')
    except FileNotFoundError:
        print(f"❌ Error: production report file not found.")
        return {}
    except Exception as e:
        print(f"❌ Error reading production report file: {e}")
        return{}
    
    # Skip header rows and only process data rows
    for line in lines[2:]:  # Start after header and separator
        parts = [p.strip() for p in line.split('|')[1:-1]]  # Exclude empty parts at start/end
        if len(parts) == 7 and 'https' in parts[0]:  # Check if it's a valid data row
            url = parts[0]
            try:
                scores[extract_path(url)] = {
                    "url_display": url,
                    "performance": int(parts[1].split()[0]),
                    "accessibility": int(parts[2].split()[0]),
                    "best_practices": int(parts[3].split()[0]),
                    "seo": int(parts[4].split()[0]),
                    "total_bundle_size": float(parts[5].split()[0]),
                    "unused_bundle_size": float(parts[6].split()[0])
                }
            except (ValueError, IndexError) as e:
                print(f"⚠️ Skipping invalid row for {url}: {e}")
    return scores

def generate_lighthouse_md(treemap_folder, prod_scores=None):
    manifest_file = glob.glob(os.path.join(treemap_folder, "manifest.json"))
    if not manifest_file:
        raise FileNotFoundError("❌ Error: manifest.json not found in " + treemap_folder)
    with open(manifest_file[0], "r") as file:
        data = json.load(file)

    report_header = "🚀 Lighthouse Report"
    if github_event == "pull_request":
        report_header = "🚀 Lighthouse score comparison for PR slot and production"

    md_output = [
        f"## {report_header}\n",
        "| 🌐 URL | ⚡ Performance | ♿ Accessibility | ✅ Best Practices | 🔍 SEO | 📦 Bundle Size | 🗑️ Unused Bundle |",
        "| --- | ----------- | ------------- | -------------- | --- | ---------------- | ---------------- |"
    ]

    for result in data:
        url = result["url"]
        url_display = f"⭐ {url}" if extract_path(url) in important_paths else url
        performance = (result["summary"]["performance"] or 0) * 100
        accessibility = (result["summary"]["accessibility"] or 0) * 100
        best_practices = (result["summary"]["best-practices"] or 0) * 100
        seo = (result["summary"]["seo"] or 0) * 100
        total_bundle_size, unused_bundle_size = get_total_and_unused_bytes_for_url(url, treemap_folder)

        if github_event != "pull_request":
            md_output.append(
                f"| {url_display} | {int(performance)} | {int(accessibility)} | {int(best_practices)} | {int(seo)} | {total_bundle_size:.2f} MB | {unused_bundle_size:.2f} MB |"
            )

        elif github_event == "pull_request" and prod_scores:
            prod_score = prod_scores.get(extract_path(url), {})
            if prod_score:
                performance_display = get_display_text(prod_score['performance'], performance)
                accessibility_display = get_display_text(prod_score['accessibility'], accessibility)
                best_practices_display = get_display_text(prod_score['best_practices'], best_practices)
                seo_display = get_display_text(prod_score['seo'], seo)
                total_bundle_display = get_bundle_display(total_bundle_size, prod_score["total_bundle_size"] - total_bundle_size)
                unused_bundle_display = get_bundle_display(unused_bundle_size, prod_score["unused_bundle_size"] - unused_bundle_size)

                md_output.append(
                    f"| {url_display} | {performance_display} | {accessibility_display} | {best_practices_display} | {seo_display} | {total_bundle_display} | {unused_bundle_display} |"
                )

    return "\n".join(md_output)

def write_report_to_file(report_content, output_file_path):
    with open(output_file_path, "w", encoding="utf-8") as md_file:
        md_file.write(report_content)

def output_to_github_actions(report_content): 
    if github_output:
        with open(github_output, 'a') as fh:
            print(f"report<<EOF\n{report_content}\nEOF", file=fh)
        print("✅ Lighthouse report outputted to GitHub Actions!")

# Generate the report for Production
if github_event != 'pull_request':
    prod_markdown_summary = generate_lighthouse_md(TREEMAP_FOLDER)
    print(f"✅ Production Lighthouse report file successfully saved to {PROD_OUTPUT_FILE_PATH}")
    write_report_to_file(prod_markdown_summary, PROD_OUTPUT_FILE_PATH)
    output_to_github_actions(prod_markdown_summary)

# Generate the report for PR
if github_event == 'pull_request':
    prod_scores = parse_prod_report();
    pr_markdown_summary = generate_lighthouse_md(TREEMAP_FOLDER, prod_scores)
    print(f"✅ PR slot Lighthouse report successfully generated")
    output_to_github_actions(pr_markdown_summary)
