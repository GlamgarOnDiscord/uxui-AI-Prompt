# Example: Dashboard

## Prompt
```
/build dashboard Analytics dashboard for an e-commerce SaaS called Meridian.
Show revenue, orders, conversion rate, and customer acquisition cost.
```

## Expected Output

A dark-mode analytics dashboard with:

### Layout
- **Sidebar** (w-64): Logo, nav groups (Overview, Orders, Products, Customers, Settings), user avatar at bottom
- **Top bar**: "Dashboard" breadcrumb, search, date range picker (last 30 days), export button
- **Main content**: Metric cards + charts + recent orders table

### Components
1. **4 Metric Cards** (grid-cols-4):
   - Revenue: $127,491.23 (↑ +14.3%)
   - Orders: 3,847 (↑ +8.7%)
   - Conversion Rate: 3.21% (↓ -0.4%)
   - CAC: $23.18 (↑ +2.1%)
   - Each with sparkline SVG

2. **Revenue Chart** (col-span-2): Line chart, 30-day view, accent-colored line, area fill at 10% opacity

3. **Orders by Category** (col-span-1): Donut chart, 5 segments, center metric = total orders

4. **Recent Orders Table**: 10 rows, columns: Order ID (monospace), Customer, Amount, Status (badge), Date. Sortable headers. Empty/loading/error states included.

5. **Top Products** (col-span-1): Ranked list with thumbnail, name, revenue, change %

### Design Choices
- Accent: emerald-500
- Numbers: `tabular-nums` everywhere
- All states: skeleton loaders on load, empty state for no-data, inline error with retry
- Sidebar: collapsible to icon-only on mobile
- Table: horizontal scroll on mobile

### Anti-Slop Checks
- ✅ Asymmetric grid (not 4 equal cards stacked)
- ✅ Skeleton loaders, not spinners
- ✅ Organic numbers (127,491.23 not 100,000)
- ✅ Monospace for all numeric data
- ✅ Error state with retry button
