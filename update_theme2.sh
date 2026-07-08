#!/bin/bash
# Revert rose-500 back to #F5CF54
sed -i 's/rose-500/\[#F5CF54\]/g' src/App.tsx
sed -i 's/rose-400/\[#F5CF54\]/g' src/App.tsx
sed -i 's/rose-600/\[#F5CF54\]/g' src/App.tsx
sed -i 's/#f43f5e/#F5CF54/g' src/App.tsx

# Remove font-serif to make everything use Inter (sans)
sed -i 's/font-serif/font-sans/g' src/App.tsx
