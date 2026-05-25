import Icon from '../Icon';
import ArrowIcon from './ArrowIcon';

export default function PreviewSectionHeader({
  label,
  labelIcon,
  title,
  highlight,
  description,
  ctaHref,
  ctaLabel,
  useEyebrow = false,
}) {
  return (
    <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-2xl">
        {useEyebrow ? (
          <p className="section-eyebrow">{label}</p>
        ) : (
          <div className="section-label">
            <Icon name={labelIcon} size={18} className="text-amber-400" />
            {label}
          </div>
        )}
        <h2 className="mt-6 text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
          {title}
          {highlight && (
            <>
              {' '}
              <span className="highlight-text">{highlight}</span>
            </>
          )}
        </h2>
        <p className="mt-6 leading-relaxed text-gray-500">{description}</p>
      </div>

      {ctaHref && ctaLabel && (
        <a href={ctaHref} className="btn-dark group hidden shrink-0 lg:inline-flex">
          {ctaLabel}
          <ArrowIcon
            direction="right"
            size={20}
            tone="light"
            className="transition group-hover:translate-x-0.5"
          />
        </a>
      )}
    </div>
  );
}
