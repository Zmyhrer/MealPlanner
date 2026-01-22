"use client";

interface SettingsSectionProps {
  children: React.ReactNode;
  className?: string;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  children,
  className = "",
}) => {
  return (
    <section
      className={`bg-white dark:bg-slate-800 rounded-3xl p-8 shadow-sm border border-slate-100 dark:border-slate-700 space-y-8 ${className}`}
    >
      {children}
    </section>
  );
};
