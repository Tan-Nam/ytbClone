import { useState, useEffect } from 'react';
import { Image, Divider } from 'semantic-ui-react';
import { Query } from '../../access/api/index';
import Linkify from 'react-linkify';
import { Button } from '../button/button';
import './video-info-box.scss';

export type DescriptionParagraphsProps = {
  video: any;
  descriptionTextClass: string;
};

export const DescriptionParagraphs = ({ video, descriptionTextClass }: DescriptionParagraphsProps) => {
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
};

export function VideoInfoBox(props: any) {
  const { video, channelId } = props;
  const [channel, setChannel] = useState<any | undefined>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState<any | undefined>();
  const [collapsed, setCollapsed] = useState(true);

  const { descriptionTextClass, buttonTitle } = getDescriptionText();
  const publishedAtString = video.snippet.publishedAt || '';

  //
  function getDescriptionText() {
    let descriptionTextClass = 'collapsed';
    let buttonTitle = 'Show More';
    if (!collapsed) {
      descriptionTextClass = 'expanded';
      buttonTitle = 'Show Less';
    }
    return {
      descriptionTextClass,
      buttonTitle,
    };
  }

  const onToggleCollapseButtonClick = () => {
    setCollapsed(!collapsed);
  };

  const getSubscriberButtonText = () => {
    if (channel) {
      // const subscriberCount = channel;
      return `Subscribe 10M`;
    }
  };

  //fecth channel information
  useEffect(() => {
    let relevant = true;
    const fetchChannel = async () => {
      try {
        setIsLoading(true);
        const response: any = await Query.channel.list({ channelId });
        if (response && relevant) {
          setChannel(response.data.items[0]);
          setIsLoading(false);
        }
      } catch (error) {
        if (relevant) {
          setHasError(error);
        }
      } finally {
        if (relevant) {
          setIsLoading(false);
        }
      }
    };
    fetchChannel();
    return () => {
      relevant = false;
    };
  }, [channelId]);

  if (!video) {
    return <div />;
  }

  return (
    <>
      {!isLoading && (
        <div className='video-info-box'>
          <Image className='channel-image' src={channel.snippet.thumbnails.medium.url} circular />
          <div className='video-info'>
            <div className='channel-name'>{channel.snippet.title}</div>
            <div className='video-publication-date'>{publishedAtString}</div>
          </div>
          <Button type='subscribe' color='youtube'>
            {getSubscriberButtonText()}
          </Button>
          <div className='video-description'>
            <DescriptionParagraphs video={video} descriptionTextClass={descriptionTextClass} />
            <Button onClick={onToggleCollapseButtonClick}>{buttonTitle}</Button>
          </div>
        </div>
      )}
      {hasError && <>something wrong</>}
    </>
  );
}
