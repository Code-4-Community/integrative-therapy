# 🔧 Contributing

In order to contribute you must be a C4C product developer. Learn more at [c4cneu.com](c4cneu.com)

## 📘 Rules of Development

1. Follow the Design Recipe.
2. Understand why your work matters. All contributions must work to improve the life of a human being, anything else is a waste of time.
3. All changes to stateless business logic should be unit tested.
4. All main features / stories should be E2E integration tested via Cypress.
5. Prefer writing pure functional code. Seperate stateful dependencies or pass them via a context paramater where possible.
6. For all visual contributions or those that require manual testing, you must include a screenshot as verification.
7. Prefer small directed PRs.
8. Pair program when possible.
9. Enforce type soundness. When in doubt, parse.
10. When function names are insufficent documentation, write a purpose statement.
11. Aim for a function body length of around six lines. Prefer many small functions to one large function.
12. Refactor frequently, but if refactoring code unrelated to your current task, place it in another PR.
13. Leave the codebase cleaner than you found it. Assume the next developer is an axe murderer who knows where you live.
14. These rules are just rough guidelines. When in doubt, follow your heart.
