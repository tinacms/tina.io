# TinaCMS email template: agent instructions

This folder holds a content-neutral TinaCMS email. The header, background, and footer use the TinaCMS design. Agents fill the body only.

## Files

- `template.html`: the email. Do not edit the header, background, or footer. Edit only the body region between `<!-- BODY:START -->` and `<!-- BODY:END -->`, and the placeholders listed below.
- `base-tina-email.html`: the source email the template came from. Use it only as a reference.

Make one copy of `template.html` for each email. Name the copy after the email, for example `password-reset.html`. Never edit `template.html`.

## Step 1. Collect the content

Collect these values before you edit. Ask the user for any value you cannot find.

1. Title and preheader.
2. Heading.
3. Body paragraphs. Two or three.
4. Button label and URL, if the email has a button.
5. Callout text, if the email has a note.
6. Video URL and poster image, if the email has a video.
7. Sign-off line and signature name.
8. Support line and support link, if the footer changes.
9. Footer legal line.

## Step 2. Fill the header and footer placeholders

| Placeholder | Rule |
| --- | --- |
| `{{TITLE}}` | Email subject, title case. |
| `{{PREHEADER}}` | 40 to 90 characters. The inbox preview text. Do not repeat the heading. |
| `{{FOOTER_LEGAL_LINE}}` | One sentence. Why the reader got the email, for example "You received this email because you have a TinaCMS account." |
| `{{SUPPORT_LINE}}` | One short question, for example "Need help with your account?" |
| `{{SUPPORT_URL}}` | Absolute `https://` URL. |
| `{{SUPPORT_LINK_LABEL}}` | Two or three words, for example "TinaCMS support". |

The footer copyright line is fixed. Change it only when the year changes.

## Step 2b. Fill the image URLs

The template does not ship image files. Host these PNG files on a public `https://` URL. Then fill the placeholders.

| Placeholder | Image |
| --- | --- |
| `{{BACKGROUND_LIGHT_URL}}` | Light page background, the large TinaCMS gradient artwork. |
| `{{BACKGROUND_DARK_URL}}` | Dark page background. |
| `{{FOOTER_LOGO_URL}}` | White TinaCMS logo, 150 px wide, transparent background. |
| `{{FACEBOOK_ICON_URL}}` | White Facebook icon, 60 by 60 px, transparent background. |
| `{{THREADS_ICON_URL}}` | White Threads icon, 60 by 60 px, transparent background. |

The PNG files in this folder are temporary. A developer uploads them to cloud storage, fills the placeholders with the public links, and then deletes the PNG files from this folder in the same PR. Email clients need hosted URLs.

## Step 3. Build the body

The body is a list of blocks. Each block is marked by a comment. Keep the required blocks. Delete the optional blocks the email does not use. Keep the blocks in this order: heading, body copy, button, callout, video, sign-off.

| Block | Status | What to replace | Rule |
| --- | --- | --- | --- |
| heading | required | `{{HEADING}}` | Sentence case. Six words or fewer. Do not use a period. |
| body copy | required | `{{BODY_HTML}}` | Two or three `<p>` elements. Each paragraph has under 60 words. |
| button | optional | `{{CTA_URL}}`, `{{CTA_LABEL}}` | One to four words. Verb first, for example "Reset password". |
| callout | optional | `{{CALLOUT_HTML}}` | One `<strong>` label, then one sentence. |
| video | optional | `{{VIDEO_URL}}`, `{{VIDEO_POSTER_URL}}`, `{{VIDEO_LABEL}}` | Poster is 536 by 301 pixels, JPG or PNG. Email clients do not play video. |
| sign-off | required | `{{SIGN_OFF}}`, `{{SIGNATURE}}` | For example "Sincerely," and "The TinaCMS Team". |

### Body HTML rules

Write `{{BODY_HTML}}` with these elements:

- Paragraph, not the last: `<p style="margin: 0 0 18px">Text.</p>`
- Paragraph, last: `<p style="margin: 0">Text.</p>`
- Bold text: `<strong>Text.</strong>`
- Link: `<a href="https://example.com" target="_blank" class="email-link" style="color: #d13f13; text-decoration: underline">Link text</a>`

Do not add headings, lists, images, or tables inside the body copy. Email clients render them poorly.

### Callout HTML rule

Write `{{CALLOUT_HTML}}` as: `<strong>Note:</strong> One sentence.`

### Video block rule

When the email has a video, keep the video block. Delete the video block when the email has no video. Do not keep an empty image.

## Step 4. Keep the styling intact

These rules keep the design and the email rendering stable.

1. Do not edit the `<style>` block, the header table, or the footer table.
2. Do not change the colors in the body. The body inherits the TinaCMS heading gradient, the button gradient, and the callout colors.
3. Do not change the heading gradient. Keep `background-clip: text` and `-webkit-text-fill-color: transparent`.
4. Do not change the font families. Keep Inter for body text and IBM Plex Sans for headings.
5. Do not use SVG images in the email. Email clients do not display SVG.
6. Do not add `<script>`, forms, or external stylesheets.
7. Do not add tracking pixels. Ask the user first.

## Step 5. Check the result

Run these checks before you give the file to the user.

1. Search for `{{`. There must be no matches.
2. Search for `BLOCK:`. Every block comment must match the blocks in the email. Delete the comments before you send the file, or keep them if the user asks.
3. Check every `href` and `src`. Each must start with `https://` or `mailto:`.
4. Open the file in a browser. Check the layout at 600 pixels and at 375 pixels width.
5. Check the button text contrast. White text on `#d13f13` passes the 4.5:1 minimum.

Report the result in one of these forms:

- All checks pass. The file is ready to send.
- Check N fails. Show the line number and the problem.

## Examples

### Transactional reset email

- Title: `Reset your password`
- Preheader: `Your password has moved to a new sign-in system.`
- Heading: `Reset your password`
- Body: one paragraph that explains why the email arrived, and one paragraph that explains the next step.
- Button: `Reset password` linked to the reset URL.
- Callout: `Note:` plus one sentence about the requirement.
- Video: delete.
- Sign-off: `Sincerely,` and `The TinaCMS Team`.

### Product announcement

- Title: `New in TinaCMS`
- Preheader: `A short summary of what changed.`
- Heading: `Introducing the new editor`
- Body: two paragraphs about the change.
- Button: `Read the release notes`, linked to the notes.
- Callout: delete.
- Video: keep when the announcement has a demo video.
- Sign-off: `Thanks,` and `The TinaCMS Team`.

## Do not

- Do not edit `template.html` directly. Make a copy.
- Do not change the header, the background, or the footer design.
- Do not change the token values or the token names in the `<style>` block.
- Do not add brand copy to the header or the footer that the user did not ask for.
- Do not leave `{{` text in the final file.
