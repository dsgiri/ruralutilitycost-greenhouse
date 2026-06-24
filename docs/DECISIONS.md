# Known Issues & Decisions Log

**Priority:** Living
**Description:** Log of architectural choices and solved problems

## Decisions
- **State Management:** Decided to use standard React context + `localStorage` for input history instead of a heavy global store (e.g., Redux) to keep the bundle size small.
- **Styling:** Chose Tailwind CSS for rapid, utility-first mobile responsiveness.
- **Charts:** Implemented Recharts for lightweight, responsive data visualization.
