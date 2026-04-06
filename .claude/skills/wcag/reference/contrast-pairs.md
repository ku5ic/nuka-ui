# Contrast Pairs

Required contrast verifications for nuka-ui semantic tokens.

## Text on surfaces

| Foreground             | Background            | Required | Notes                      |
| ---------------------- | --------------------- | -------- | -------------------------- |
| `--nuka-text-base`    | `--nuka-bg-base`     | 4.5:1    | Primary text               |
| `--nuka-text-base`    | `--nuka-bg-subtle`   | 4.5:1    | Text on subtle surface     |
| `--nuka-text-base`    | `--nuka-bg-muted`    | 4.5:1    | Text on muted surface      |
| `--nuka-text-muted`   | `--nuka-bg-base`     | 4.5:1    | Secondary text             |
| `--nuka-text-subtle`  | `--nuka-bg-base`     | 3:1      | Tertiary text: large only |
| `--nuka-text-inverse` | `--nuka-bg-emphasis` | 4.5:1    | Inverse text               |

## Accent

| Foreground              | Background          | Required | Notes                  |
| ----------------------- | ------------------- | -------- | ---------------------- |
| `--nuka-text-inverse`  | `--nuka-accent-bg` | 4.5:1    | Button text on primary |
| `--nuka-accent-text`   | `--nuka-bg-base`   | 4.5:1    | Accent text on page    |
| `--nuka-accent-border` | `--nuka-bg-base`   | 3:1      | Outline border on page |

## Feedback: danger

| Foreground              | Background            | Required |
| ----------------------- | --------------------- | -------- |
| `--nuka-danger-text`   | `--nuka-bg-base`     | 4.5:1    |
| `--nuka-danger-text`   | `--nuka-danger-bg`   | 4.5:1    |
| `--nuka-text-inverse`  | `--nuka-danger-base` | 4.5:1    |
| `--nuka-danger-border` | `--nuka-bg-base`     | 3:1      |

## Feedback: success

| Foreground               | Background             | Required |
| ------------------------ | ---------------------- | -------- |
| `--nuka-success-text`   | `--nuka-bg-base`      | 4.5:1    |
| `--nuka-success-text`   | `--nuka-success-bg`   | 4.5:1    |
| `--nuka-text-inverse`   | `--nuka-success-base` | 4.5:1    |
| `--nuka-success-border` | `--nuka-bg-base`      | 3:1      |

## Feedback: warning

| Foreground               | Background             | Required |
| ------------------------ | ---------------------- | -------- |
| `--nuka-warning-text`   | `--nuka-bg-base`      | 4.5:1    |
| `--nuka-warning-text`   | `--nuka-warning-bg`   | 4.5:1    |
| `--nuka-text-inverse`   | `--nuka-warning-base` | 4.5:1    |
| `--nuka-warning-border` | `--nuka-bg-base`      | 3:1      |

## Focus

| Foreground             | Background          | Required |
| ---------------------- | ------------------- | -------- |
| `--nuka-border-focus` | `--nuka-bg-base`   | 3:1      |
| `--nuka-border-focus` | `--nuka-accent-bg` | 3:1      |

## Verified values (light mode)

| Token                            | Hex       | Notes                 |
| -------------------------------- | --------- | --------------------- |
| `--nuka-accent-bg` (accent-500) | `#43546a` | 7.74:1 on white: AAA |
