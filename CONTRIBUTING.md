
## Documentation checklist

Each of our docs should adhere to the following:

- Title is short & specific
- Headers are logically ordered & consistent
- Purpose of document is explained in the first paragraph
- Procedures are tested and work
- Any technical concepts are explained or linked to
- Document follows structure from templates
- All links work
- Spelling and grammar checker has been run
- Graphics and images are clear and useful
- Any prerequisites and next steps are defined

## Website contributions

We welcome contributions to improve the Tina.io experience!

1. **Fork the Repo**: Work on your own fork to avoid conflicts.
1. **Branching**: Use `feature/your-feature-name` or `bugfix/your-bugfix-name` for changes.
1. **Using TinaCMS**: For content changes (e.g., docs), use visual editing with TinaCMS locally (e.g., http://localhost:3000/admin).
1. **Commits**: Write clear, descriptive messages. Break large changes into multiple commits.
1. **Code Quality**:
   - Use Tailwind over inline CSS or styled components.
   - Follow DRY principles and refactor reusable code.
   - Comment on calculations or workarounds, and open issues for any technical debt.
1. **Pull Requests**:
   - Reference related issues and include screenshots for UI changes.
   - If no issue exists, create one and link it.
   - Commit the generated `tina-lock.json` file, and rerun the project locally after merging to update it.
1. **Review Process**:
   - Due to Vercel deployment issues, maintainers will recreate your changes on a new branch to test before approval.

Cheers! 🦙
