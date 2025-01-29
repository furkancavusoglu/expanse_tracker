// Layout
export const layout = {
  screenPadding: "px-6",
  screenBackground: "bg-white",
  contentSpacing: "space-y-8",
  sectionSpacing: "space-y-3",
  verticalGap: {
    small: "mt-2",
    medium: "mt-4",
    large: "mt-6",
    xlarge: "mt-8",
    xxlarge: "mt-12",
  },
  headerSpacing: "mb-12",
} as const;

// Typography
export const typography = {
  header: "text-3xl font-bold text-center",
  text: "text-base",
  label: "text-gray-600 text-base font-medium",
  error: "text-red-500 text-center text-base",
  success: "text-green-500 text-center text-base",
} as const;

// Inputs
export const inputs = {
  textInput: "border border-gray-300 rounded-lg p-4 bg-gray-50 text-base",
} as const;

// Buttons
export const buttons = {
  primary: "bg-black py-4 rounded-lg",
  primaryText: "text-white text-center font-semibold text-base",
  link: "px-3 py-2 rounded-md active:bg-gray-100",
  linkText: "text-black text-center text-base",
  loadingState: "opacity-70",
  activeState: "active:opacity-70",
} as const;

// Common combinations
export const common = {
  screenContainer: `flex-1 justify-center ${layout.screenPadding} ${layout.screenBackground}`,
  header: `${typography.header} ${layout.verticalGap.medium}`,
  inputGroup: layout.sectionSpacing,
  formContainer: layout.contentSpacing,
} as const;
