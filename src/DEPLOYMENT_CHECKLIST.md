# ✅ Deployment Checklist
## Lighthouse Optimization Rollout

**Deployment Date:** _____________  
**Deployed By:** _____________  
**Version:** v2.0 (Performance Optimized)

---

## 🚀 PRE-DEPLOYMENT CHECKS

### Code Quality
- [ ] All TypeScript files compile without errors
- [ ] No ESLint warnings introduced
- [ ] No console errors in development mode
- [ ] All imports resolve correctly

### Visual Regression Testing
- [ ] Homepage loads identically (layout, colors, spacing)
- [ ] Tiles display correctly (trapezoid shape preserved)
- [ ] Modal opens/closes smoothly
- [ ] Text rotator animates correctly
- [ ] Admin panel accessible via `Ctrl+Shift+A`
- [ ] Filters work (category selection)

### Functional Testing
- [ ] Events load from Supabase
- [ ] Deep linking works (`?evento=slug`)
- [ ] Navigation (prev/next) in modal works
- [ ] Image gallery cycles correctly
- [ ] Mobile gestures (swipe) functional
- [ ] Desktop mouse parallax works
- [ ] Mobile gyroscope parallax works

### Performance Testing (Local)
- [ ] Fonts load without FOIT/FOUT flash
- [ ] First row of tiles loads instantly
- [ ] No layout shift during font load
- [ ] Images load progressively (lazy loading)
- [ ] Network tab shows preconnects established early

---

## 📊 POST-DEPLOYMENT MONITORING

### Immediate (0-1 hour)
- [ ] Check browser console for errors (Chrome, Firefox, Safari)
- [ ] Verify font rendering on different devices
- [ ] Test Supabase retry logic with throttled network
- [ ] Monitor API error rates in Supabase dashboard
- [ ] Check Core Web Vitals in Chrome DevTools

### Short-term (1-24 hours)
- [ ] Run Lighthouse audit (mobile + desktop)
- [ ] Compare LCP/FCP metrics with baseline
- [ ] Monitor user error reports (if analytics enabled)
- [ ] Check image loading patterns in production
- [ ] Verify preconnects in Network tab (h2 connection reuse)

### Medium-term (1-7 days)
- [ ] Analyze Core Web Vitals from real users (CrUX data)
- [ ] Review Supabase retry logs
- [ ] Monitor font loading success rate
- [ ] Check bounce rate changes (should improve)
- [ ] Validate SEO impact (heading hierarchy preserved)

---

## 🔍 LIGHTHOUSE AUDIT TARGETS

Run official Lighthouse audit and verify these scores:

### Mobile (Target)
- **Performance:** ≥ 85 (was ~60-70)
- **LCP:** < 2.5s (was 16.4s)
- **FCP:** < 1.8s (improved by ~230ms)
- **CLS:** < 0.1 (unchanged - already good)
- **TBT:** < 200ms (improved by retry logic)

### Desktop (Target)
- **Performance:** ≥ 95 (was ~80-85)
- **LCP:** < 1.2s (improved by ~750ms)
- **FCP:** < 1.0s (improved by font optimization)
- **CLS:** < 0.1 (unchanged - already good)
- **TBT:** < 100ms (already optimal)

---

## 🛑 ROLLBACK CRITERIA

If ANY of these occur, consider rollback:

### Critical Issues
- [ ] ❌ Fonts not loading at all (FOIT persists)
- [ ] ❌ Events fail to load from Supabase (retry not working)
- [ ] ❌ Images broken or not loading
- [ ] ❌ Layout completely broken on any device

### Major Issues
- [ ] ⚠️ LCP worse than baseline (>16s mobile)
- [ ] ⚠️ Console errors on page load
- [ ] ⚠️ Modal/navigation broken
- [ ] ⚠️ Admin panel inaccessible

### Minor Issues (Monitor, Don't Rollback)
- [ ] 🔵 Slightly slower font load (still < 1s)
- [ ] 🔵 One image fails to load (fallback works)
- [ ] 🔵 Gyroscope permission prompt on iOS

---

## 🔧 ROLLBACK PROCEDURE

If rollback is needed:

### Option 1: Git Revert
```bash
# Identify the optimization commit
git log --oneline

# Revert to previous version
git revert <commit-hash>
git push origin main
```

### Option 2: Manual Revert

#### 1. Restore Blocking Font Import
```css
/* /styles/globals.css - Line 1 */
@import url("https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Outfit:wght@300;400;500;700;900&display=swap");
```

#### 2. Remove Font Preloading
```tsx
/* /App.tsx - Remove lines 337-354 (font preload section) */
```

#### 3. Remove Retry Logic
```tsx
/* /utils/api.ts - Remove fetchWithRetry function */
/* Replace fetchWithRetry calls with regular fetch */
```

---

## 📈 SUCCESS METRICS

Mark as **SUCCESSFUL** if:

- ✅ Lighthouse Performance score improved by ≥ 10 points
- ✅ LCP < 2.5s on mobile (was 16.4s)
- ✅ No visual regressions reported
- ✅ No functional bugs introduced
- ✅ Supabase retry logic catches ≥ 1 timeout in logs
- ✅ Font loading smooth with no flash
- ✅ User engagement metrics stable or improved

---

## 📞 SUPPORT CONTACTS

### Technical Issues
- **Developer:** [Your Name]
- **DevOps:** [DevOps Contact]
- **Supabase Support:** [Supabase Dashboard](https://supabase.com/dashboard)

### Monitoring Tools
- **Lighthouse CI:** [URL if configured]
- **Supabase Logs:** https://supabase.com/dashboard/project/ykkmplrnqcwpgfdjshxn/logs
- **Error Tracking:** [Sentry/LogRocket URL if configured]

---

## 📝 POST-DEPLOYMENT NOTES

### Observations:
```
[Space for deployment engineer to write notes]




```

### Issues Encountered:
```
[Space for deployment engineer to write notes]




```

### Recommendations:
```
[Space for deployment engineer to write notes]




```

---

## ✅ SIGN-OFF

- [ ] **Developer:** _________________ Date: _______
- [ ] **QA:** _________________ Date: _______
- [ ] **Product Owner:** _________________ Date: _______

---

_WAV BTL — Deployment Checklist v2.0_  
_Generated: December 1, 2025_
