# Example: Auth Page (Login + Signup)

## Prompt
```
/build auth Login and signup page for a fintech app called Aperture.
Include Google/GitHub OAuth and email magic link.
```

## Expected Output

A dark-mode auth page with:

### Layout: Split Screen (Asymmetric)
- **Left (60%)**: Dark content area with branding, testimonial, background pattern
- **Right (40%)**: Auth form, white-on-near-black card with subtle border

### Left Panel
- Logo top-left
- Large quote mid-page: "Aperture saves us 12 hours of reconciliation work every week." — testimonial from a real-sounding CFO
- Customer avatar + name + role + company below quote
- Background: subtle grid pattern + single soft accent glow blob (NOT gradient mesh)
- Copyright bottom-left

### Right Panel: Auth Form
- Toggle at top: "Sign in" / "Create account" (segmented control)
- OAuth buttons (stacked): "Continue with Google", "Continue with GitHub" — each with icon, outlined border style
- Divider: "or continue with email" (tiny text, zinc-600, lines on each side)
- Email input: labeled, focus ring, validation inline below
- Password input (sign-in) or "Send magic link" (sign-up)
- Submit button: full-width, accent color, `active:scale-[0.98]` tactile press
- Helper links: "Forgot password?" / "Terms of Service"

### States
- **Loading**: Button enters disabled state with animated dots (`···`) + "Signing in..." text — no generic spinner
- **Error**: Inline red message below input ("Invalid email or password") + shake animation on form
- **Success**: Button morphs to checkmark icon → redirect animation

### Design Choices
- No marketing fluff — pure functional auth
- MOTION_INTENSITY lowered to 4 (users are in task mode, not browsing)
- DESIGN_VARIANCE: 8 (asymmetric split screen)
- Font: Geist sans
- Accent: deep blue (`#3b82f6`) — fintech trust signal

### Anti-Slop Checks
- ✅ No centered card floating in space
- ✅ Error state implemented (inline, near the field)
- ✅ Loading state on submit button
- ✅ No generic "Login" button text (uses "Sign in" or "Send magic link")
- ✅ Real testimonial, not Lorem Ipsum
- ✅ `autocomplete="email"` on email field (WCAG 1.3.5)
