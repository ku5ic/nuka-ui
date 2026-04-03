# Contrast Pairs

Required contrast verifications for vault-ui semantic tokens.

## Text on surfaces

| Foreground             | Background            | Required | Notes                      |
| ---------------------- | --------------------- | -------- | -------------------------- |
| `--vault-text-base`    | `--vault-bg-base`     | 4.5:1    | Primary text               |
| `--vault-text-base`    | `--vault-bg-subtle`   | 4.5:1    | Text on subtle surface     |
| `--vault-text-base`    | `--vault-bg-muted`    | 4.5:1    | Text on muted surface      |
| `--vault-text-muted`   | `--vault-bg-base`     | 4.5:1    | Secondary text             |
| `--vault-text-subtle`  | `--vault-bg-base`     | 3:1      | Tertiary text — large only |
| `--vault-text-inverse` | `--vault-bg-emphasis` | 4.5:1    | Inverse text               |

## Accent

| Foreground              | Background          | Required | Notes                  |
| ----------------------- | ------------------- | -------- | ---------------------- |
| `--vault-text-inverse`  | `--vault-accent-bg` | 4.5:1    | Button text on primary |
| `--vault-accent-text`   | `--vault-bg-base`   | 4.5:1    | Accent text on page    |
| `--vault-accent-border` | `--vault-bg-base`   | 3:1      | Outline border on page |

## Feedback — danger

| Foreground              | Background            | Required |
| ----------------------- | --------------------- | -------- |
| `--vault-danger-text`   | `--vault-bg-base`     | 4.5:1    |
| `--vault-danger-text`   | `--vault-danger-bg`   | 4.5:1    |
| `--vault-text-inverse`  | `--vault-danger-base` | 4.5:1    |
| `--vault-danger-border` | `--vault-bg-base`     | 3:1      |

## Feedback — success

| Foreground               | Background             | Required |
| ------------------------ | ---------------------- | -------- |
| `--vault-success-text`   | `--vault-bg-base`      | 4.5:1    |
| `--vault-success-text`   | `--vault-success-bg`   | 4.5:1    |
| `--vault-text-inverse`   | `--vault-success-base` | 4.5:1    |
| `--vault-success-border` | `--vault-bg-base`      | 3:1      |

## Feedback — warning

| Foreground               | Background             | Required |
| ------------------------ | ---------------------- | -------- |
| `--vault-warning-text`   | `--vault-bg-base`      | 4.5:1    |
| `--vault-warning-text`   | `--vault-warning-bg`   | 4.5:1    |
| `--vault-text-inverse`   | `--vault-warning-base` | 4.5:1    |
| `--vault-warning-border` | `--vault-bg-base`      | 3:1      |

## Focus

| Foreground             | Background          | Required |
| ---------------------- | ------------------- | -------- |
| `--vault-border-focus` | `--vault-bg-base`   | 3:1      |
| `--vault-border-focus` | `--vault-accent-bg` | 3:1      |

## Verified values (light mode)

| Token                            | Hex       | Notes                 |
| -------------------------------- | --------- | --------------------- |
| `--vault-accent-bg` (accent-500) | `#43546a` | 7.74:1 on white — AAA |
