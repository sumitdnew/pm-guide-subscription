# Professional Simulator Styling System

## Overview
This document outlines the professional styling system implemented for all simulator components in the PM Guide application.

## 🎨 Design System

### Color Schemes
Each simulator uses a specific color scheme for consistency:

- **Blue** (`colorSchemes.blue`): RICE, ICE, OKR, North Star
- **Green** (`colorSchemes.green`): JTBD, Customer Development, Design Thinking
- **Purple** (`colorSchemes.purple`): ICE, SWOT, Competitive Analysis
- **Orange** (`colorSchemes.orange`): Growth Hacking, AARRR Metrics
- **Teal** (`colorSchemes.teal`): Market Size, Pricing Strategy

### Layout Structure
```jsx
<div className={simulatorStyles.container}>
  <div className={simulatorStyles.content}>
    {/* Header with icon and title */}
    <div className={simulatorStyles.header}>
      <div className="flex items-center space-x-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-[color]-600 to-[color]-600 rounded-xl shadow-lg">
          <Icon className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className={simulatorStyles.typography.h1}>Title</h1>
          <p className={simulatorStyles.typography.body}>Subtitle</p>
        </div>
      </div>
    </div>

    {/* Main Card */}
    <div className={simulatorStyles.card}>
      {/* Card Header */}
      <div className={`bg-gradient-to-r ${colorScheme.primary} text-white p-6`}>
        <h2 className="text-2xl font-bold mb-2">Framework Name</h2>
        <p className="text-[color]-100">Description</p>
      </div>

      {/* Card Content */}
      <div className={simulatorStyles.cardContent}>
        {/* Info Section */}
        <div className={`bg-gradient-to-r ${colorScheme.secondary} rounded-xl p-6 mb-8 border ${colorScheme.border}`}>
          <h3 className={simulatorStyles.infoTitle}>About Framework</h3>
          <p className={simulatorStyles.infoDescription}>Description...</p>
          <div className="flex items-center justify-between">
            <a href="..." className={simulatorStyles.infoLink}>Learn more →</a>
            <button className={simulatorStyles.actionButton}>
              <Icon className="h-4 w-4" />
              <span>View Case Studies</span>
            </button>
          </div>
        </div>

        {/* Form Section */}
        <div className={simulatorStyles.formGrid}>
          <div className={simulatorStyles.formGroup}>
            <label className={simulatorStyles.formLabel}>
              <div className="flex items-center space-x-2">
                <Icon className="h-4 w-4 text-[color]-600" />
                <span>Label</span>
              </div>
            </label>
            <input className={simulatorStyles.formInput} />
          </div>
        </div>

        {/* Results Section */}
        <div className={simulatorStyles.resultCard}>
          <div className="text-center">
            <div className={simulatorStyles.resultScore}>Result</div>
            <div className={simulatorStyles.resultLabel}>Label</div>
            <div className={simulatorStyles.resultFormula}>Formula</div>
          </div>
          <div className={simulatorStyles.resultInterpretation}>
            <div className="text-sm text-gray-700">Interpretation...</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

## 🎯 Key Features

### 1. Professional Gradients
- Card headers use gradient backgrounds
- Info sections have subtle gradient backgrounds
- Consistent color schemes across components

### 2. Enhanced Typography
- Clear hierarchy with proper font weights
- Consistent spacing and line heights
- Professional font stack

### 3. Improved Forms
- Icons for each form field
- Better focus states
- Consistent input styling
- Clear labels and placeholders

### 4. Professional Results Display
- Large, prominent score display
- Clear formula representation
- Contextual interpretation
- Status-based styling

### 5. Responsive Design
- Mobile-first approach
- Flexible grid layouts
- Consistent spacing across devices

## 🚀 Implementation Guide

### For New Simulators

1. **Import the styling system:**
```jsx
import { simulatorStyles, colorSchemes } from '../styles/simulatorStyles';
```

2. **Choose a color scheme:**
```jsx
const colorScheme = colorSchemes.blue; // or green, purple, orange, teal
```

3. **Use the layout structure:**
```jsx
<div className={simulatorStyles.container}>
  <div className={simulatorStyles.content}>
    {/* Header */}
    {/* Main Card */}
    {/* Form */}
    {/* Results */}
  </div>
</div>
```

4. **Add appropriate icons:**
```jsx
import { Calculator, TrendingUp, Users, Target } from 'lucide-react';
```

### For Existing Simulators

1. **Update imports**
2. **Replace container classes**
3. **Update form styling**
4. **Enhance results display**
5. **Add professional gradients**

## 📊 Benefits

- **Consistency**: All simulators follow the same design patterns
- **Professional Appearance**: Modern, clean, and trustworthy design
- **Better UX**: Clear visual hierarchy and improved readability
- **Maintainability**: Centralized styling system
- **Scalability**: Easy to add new simulators with consistent styling

## 🎨 Customization

### Adding New Color Schemes
```jsx
export const colorSchemes = {
  // ... existing schemes
  custom: {
    primary: 'from-custom-600 to-custom-700',
    secondary: 'from-custom-50 to-custom-100',
    accent: 'custom',
    text: 'text-custom-900',
    border: 'border-custom-200'
  }
};
```

### Customizing Styles
```jsx
const customStyles = {
  ...simulatorStyles,
  customProperty: 'custom-value'
};
```

## 🔧 Maintenance

- Keep the styling system centralized in `src/styles/simulatorStyles.js`
- Update all simulators when making global style changes
- Test responsiveness across different screen sizes
- Ensure accessibility standards are met 