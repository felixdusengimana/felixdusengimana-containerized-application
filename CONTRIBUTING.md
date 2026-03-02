# Contributing to AgriMarket

Thank you for your interest in contributing to AgriMarket! This document provides guidelines and instructions for contributing to the project.

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork**: `git clone https://github.com/yourusername/agrimarket.git`
3. **Add upstream remote**: `git remote add upstream https://github.com/felixdusengimana-containerized-application/agrimarket.git`
4. **Create a feature branch**: `git checkout -b feature/your-feature-name`

## Development Workflow

### Backend Development

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Frontend Development

```bash
cd frontend
npm install
npm run dev
```

## Commit Guidelines

Follow these guidelines when writing commit messages:

- Use the imperative mood: "add feature" not "added feature"
- Limit the first line to 72 characters
- Reference issues and pull requests liberally after the first line
- Separate subject from body with a blank line

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

**Types:**
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Code style changes (no logic changes)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Build, dependencies, or maintenance tasks

**Example:**
```
feat: Add product search functionality

Implement search endpoint in the API to allow users to search
for products by name. Uses Django ORM filtering and returns
paginated results.

Closes #42
```

## Code Style

### Python (Backend)

- Follow PEP 8 style guide
- Use 4 spaces for indentation
- Use meaningful variable and function names
- Add docstrings to functions and classes

```python
def get_product_by_id(product_id: int) -> Product:
    """
    Retrieve a product by its ID.
    
    Args:
        product_id: The ID of the product to retrieve
        
    Returns:
        The Product instance
        
    Raises:
        Product.DoesNotExist: If product is not found
    """
    return Product.objects.get(id=product_id)
```

### TypeScript/React (Frontend)

- Use functional components with hooks
- Use TypeScript for type safety
- Use descriptive component names
- Add JSDoc comments for complex logic

```typescript
/**
 * ProductList component displays all available products
 * @returns React component showing products with latest prices
 */
const ProductList: FC = () => {
  // Component code
}
```

## Testing

### Backend Tests

```bash
cd backend
python manage.py test prices
```

### Frontend Tests (when added)

```bash
cd frontend
npm test
```

## Pull Request Process

1. **Update your branch**: `git pull upstream main`
2. **Push your changes**: `git push origin feature/your-feature-name`
3. **Create a Pull Request** on GitHub
4. **Fill out the PR template** completely
5. **Wait for code review** and address any feedback
6. **Ensure CI/CD passes** before merging

### PR Title Format

Use the same format as commit messages:
```
feat: Add price statistics endpoint
```

### PR Description Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## How Has This Been Tested?
Describe the tests you ran

## Checklist
- [ ] My code follows the style guidelines
- [ ] I have made corresponding changes to documentation
- [ ] I have added tests for my changes
- [ ] All new and existing tests pass
- [ ] I have updated the README if needed

## Related Issues
Closes #(issue number)
```

## Code Review

When reviewing code:

1. **Be respectful** and constructive
2. **Ask questions** rather than making demands
3. **Praise good solutions** and clever implementations
4. **Suggest improvements** with specific examples
5. **Approve** when code meets standards

## Reporting Issues

### Bug Reports

Include:
- Description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, versions)

### Feature Requests

Include:
- Clear description of the feature
- Why it's needed
- How it should work
- Potential implementation approach

## Communication

- **GitHub Issues**: For bugs and features
- **Pull Requests**: For code discussions
- **Team Channel**: For general discussion

## License

By contributing to AgriMarket, you agree that your contributions will be licensed under the MIT License.

## Questions?

Feel free to open an issue with the `question` label or contact the project maintainers.

Thank you for contributing! 🌾
