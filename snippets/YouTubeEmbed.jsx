export const YouTubeEmbed = ({ src, title }) => (
  <div style={{ position: 'relative', width: '100%', maxWidth: '800px', margin: '1.5rem auto', aspectRatio: '16/9', overflow: 'hidden', borderRadius: '12px' }}>
    <iframe
      src={src}
      title={title || "YouTube video"}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
      loading="lazy"
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
    />
  </div>
);
