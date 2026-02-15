<!-- SPDX-License-Identifier: AGPL-3.0-or-later -->
<!-- SPDX-FileCopyrightText: 2026 SubLang International <https://sublang.ai> -->

# SPDX: SPDX Headers

## SPDX-001: Copyright Header Presence

While the file is git-tracked or `git add`-able, with comment syntax (see exclusions below), when checking its first comment block (after shebang if present), the file shall contain `SPDX-FileCopyrightText`.

## SPDX-002: License Header Presence

While the file is git-tracked or `git add`-able, with comment syntax (see exclusions below) and one or more license files exist at project root, when checking its first comment block (after shebang if present), the file shall contain `SPDX-License-Identifier`.

### Exclusions

- No comment syntax: e.g., JSON, binaries
- Config: e.g., `.gitignore`, `.editorconfig`, `**/settings.json`, `AGENTS.md`, lock files
- Generated/vendor: e.g., `dist/`, `node_modules/`
- License/legal documents

### License File Detection

Recognized patterns at project root:

- `LICENSE`, `LICENSE.txt`, `LICENSE.md`, `COPYING`
- `LICENSE-CONTENT`, `LICENSE-APACHE`, etc. (named variants)
- `LICENCE`, `LICENCE.txt` (British spelling)
- `LICENSES/` folder (REUSE convention)
