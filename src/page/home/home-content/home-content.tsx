import { useState, useEffect } from 'react';
import { VideoGrid, Loader, Pagination } from '../../../component';
import { Query } from '../../../access/api';
import './home-content.scss';

function HomeContent() {
  const [videoList, setVideoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [pagination, setPagination] = useState({
    _page: 1,
    _limit: 8,
    totalRow: 46,
  });
  const [filter, setFilter] = useState({
    _page: 1,
    _limit: 8,
  });

  //
  function handlePageChange(newPage: number) {
    setFilter({
      ...filter,
      _page: newPage,
    });
  }

  useEffect(() => {
    let relevant = true;
    setIsLoading(true);
    const fetchVideo = async () => {
      try {
        const response: any = await Query.video.list(filter);
        if (response && relevant) {
          setVideoList(response.data);
          setPagination((prev) => ({
            ...prev,
            _page: filter._page,
            totalRow: response.headers['x-total-count'],
          }));
          setIsLoading(false);
          setHasError(false);
        }
      } catch (error) {
        if (relevant) setHasError(true);
      } finally {
        if (relevant) {
          setIsLoading(false);
        }
      }
    };
    fetchVideo();
    return () => {
      relevant = false;
    };
  }, [filter]);

  return (
    <div className='home-content'>
      <div className='home-content__list'>
        {isLoading ? (
          <div className='loader'>
            <Loader />
          </div>
        ) : (
          <>
            <div className='home-content__item'>
              <VideoGrid title='recommend' videos={videoList} />
            </div>
          </>
        )}
      </div>
      <div className='pagination-container'>
        <Pagination pagination={pagination} onPageChange={handlePageChange} />
      </div>
      {hasError && <> no data...</>}
    </div>
  );
}

export default HomeContent;
