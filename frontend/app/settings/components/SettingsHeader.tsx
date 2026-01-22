"use client";

interface SettingsHeaderProps {
  title?: string;
  subtitle?: string;
}

export const SettingsHeader: React.FC<SettingsHeaderProps> = ({
  title = "Preferences",
  subtitle = "Customize your culinary planning studio",
}) => {
  return (
    <header>
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="text-slate-500 text-sm">{subtitle}</p>
    </header>
  );
};
