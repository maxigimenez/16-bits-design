# Changelog

All notable changes to this package are documented in this file.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and
this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 0.3.0 - 2026-09-04

### Added

- Dialog block content, compact and medium sizes, and disabled/loading confirmation states for short form workflows.
- A subtle Alert variant with derived low-emphasis surfaces, borders, and compact markers.

### Changed

- Dialog focus trapping now includes native select, textarea, editable, and explicitly tabbable controls.
- An open Select consumes Escape before a containing dialog closes.
- Alert surfaces and borders can be themed through `--bits-alert-surface` and `--bits-alert-border`.

## 0.2.0 - 2026-09-02

### Added

- Alert primitives for persistent inline feedback and recovery actions.
- Code primitives for accessible inline and keyboard-scrollable block content.
- EmptyState primitives for reusable absence messaging.
- Segmented controls for controlled and uncontrolled exclusive selection.
- Spinner primitives for accessible indeterminate progress.
- Responsive semantic Table primitives with aligned numeric cells and composite cell content.
- A `--bits-text-dim` theme token, `colors.textDim`, and the `dim` Typography tone.
- Storybook examples, visual evidence, and API guidance for every new primitive.

### Changed

- Aligned existing component dimensions, spacing, and states with the local design reference.
- Made native element theme defaults low-specificity so consumer classes override predictably.
- Expanded the theme and agent documentation with complete token and usage guidance.

## 0.1.0 - 2026-08-31

### Added

- Initial public release of the React component library, CSS theme system, and Storybook.
