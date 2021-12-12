import Linkify from 'react-linkify';

type DescriptionParagraphsProps = {
  video: any;
  descriptionTextClass?: string;
};

export function VideoDescription(props: DescriptionParagraphsProps) {
  const { video, descriptionTextClass } = props;
  const videoDescription = video.snippet ? video.snippet.description : null;
  if (!videoDescription) {
    return null;
  }

  return (
    <div className={descriptionTextClass}>
      {videoDescription.split('\n').map((paragraph: any, index: number) => (
        <p key={index}>
          <Linkify>{paragraph}</Linkify>
        </p>
      ))}
    </div>
  );
}
