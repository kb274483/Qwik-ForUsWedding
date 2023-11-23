import { component$ } from "@builder.io/qwik";
import { useDocumentHead, useLocation } from "@builder.io/qwik-city";

/**
 * The RouterHead component is placed inside of the document `<head>` element.
 */
export const RouterHead = component$(() => {
  const head = useDocumentHead();
  const loc = useLocation();

  return (
    <>
      <title>{head.title}</title>

      <link rel="canonical" href={loc.url.href} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:site_name" content="Roy&BucculaWedding" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="https://elasticbeanstalk-ap-northeast-3-320080014524.s3.ap-northeast-3.amazonaws.com/photos/53346273673_f9e3d8b1ff_q.jpg" />
      <link rel="icon" type="image/svg+xml" href="/hand-in-hand.png" />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet"></link>
      <script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
      <script src="https://kit.fontawesome.com/e11e03df8b.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/scrolly-video@latest/dist/scrolly-video.js"></script>
      {head.meta.map((m) => (
        <meta key={m.key} {...m} />
      ))}

      {head.links.map((l) => (
        <link key={l.key} {...l} />
      ))}

      {head.styles.map((s) => (
        <style key={s.key} {...s.props} dangerouslySetInnerHTML={s.style} />
      ))}
    </>
  );
});
