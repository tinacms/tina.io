---
title: Field Plugins
---

All field plugins share a common config:

```typescript
interface FieldConfig {
  name: string
  parse(): any
  format(): any
  component: string | ReactComponent
}
```
