import React, { useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getLoading } from '../../state/reducer/video';
import * as videoAction from '../../state/action/video';
import { ToastContainer, toast } from 'react-toastify';
import './trending-add-form.scss';

const optionSelect = ['UCGwu0nbY2wSkW8N-cghnLpA', 'UCANLZYMidaCbLQFWXBC95Jg', 'UCSpfz1IyUA1NBH-cgj8ygUw'];

export function TrendingAddForm(props: any) {
  const { isShowing, hide, closeModal } = props;
  const [newVideo, setNewVideo] = useState({
    id: '',
    snippet: {
      channelId: '',
      title: '',
      description: '',
      thumbnails: {
        medium: {
          url: '',
        },
      },
    },
  });
  const [hasError, setHasError] = useState<any | undefined>(null);
  const [isFormValid, setIsFormValid] = useState({
    id: '',
    title: '',
    image: '',
    channelId: '',
    description: '',
  });
  const isLoading = useSelector(getLoading);
  const dispatch = useDispatch();

  const videoIdRef = useRef<any>(null);
  const channelIdRef = useRef<any>(null);
  const videoTitleRef = useRef<any>(null);
  const videoDescriptionRef = useRef<any>(null);
  const videoImageRef = useRef<any>(null);

  const diasble = isLoading ? 'disable' : '';

  //
  function handleIdChange(e: any) {
    let field = e.target.name;
    setNewVideo({
      ...newVideo,
      [field]: e.target.value,
    });
  }

  function handleSnippetChange(e: any) {
    let field = e.target.name;
    setNewVideo((prev) => ({
      ...prev,
      snippet: {
        ...prev.snippet,
        [field]: e.target.value,
      },
    }));
  }

  function handleImageChange(e: any) {
    setNewVideo((prev) => ({
      ...prev,
      snippet: {
        ...prev.snippet,
        thumbnails: {
          medium: {
            url: e.target.value,
          },
        },
      },
    }));
  }

  function handleformValidation() {
    if (
      !videoIdRef.current.value ||
      !channelIdRef.current.value ||
      !videoTitleRef.current.value ||
      !videoDescriptionRef.current.value ||
      !videoImageRef.current.value
    ) {
      return false;
    }
    return true;
  }

  async function handleSubmitNewVideo(e: any) {
    e.preventDefault();
    setIsFormValid({
      ...isFormValid,
      id: videoIdRef.current.value ? videoIdRef.current.value : 'invalid',
      title: videoTitleRef.current.value ? videoTitleRef.current.value : 'invalid',
      image: videoImageRef.current.value ? videoImageRef.current.value : 'invalid',
      channelId: channelIdRef.current.value ? channelIdRef.current.value : 'invalid',
      description: videoDescriptionRef.current.value ? videoDescriptionRef.current.value : 'invalid',
    });
    if (!handleformValidation()) {
      toast.error('Invalid form');
    } else {
      try {
        dispatch(videoAction.createNewVideo.request(newVideo));
        closeModal();
      } catch (error) {
        alert(error);
        closeModal();
        setHasError(error);
      }
    }
  }

  return isShowing
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='modal-overlay' />
          <div className='modal-wrapper' aria-modal aria-hidden tabIndex={-1} role='dialog'>
            <div className='modal'>
              <div className='modal-header'>
                <h2 className='modal-header__title '>New video </h2>
                <button type='button' className='modal-close-button' data-dismiss='modal' aria-label='Close' onClick={hide}>
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='form-container'>
                <form className='add-form' onSubmit={(e) => handleSubmitNewVideo(e)}>
                  <div className='form__div'>
                    <input
                      ref={videoIdRef}
                      type='text'
                      className={[isFormValid['id'], 'form__input'].join(' ')}
                      placeholder=' '
                      name='id'
                      onChange={(e) => handleIdChange(e)}
                    />
                    <label className='form__label'>Id</label>
                  </div>
                  <div className='form__div'>
                    <input
                      ref={videoTitleRef}
                      type='text'
                      className={[isFormValid['title'], 'form__input'].join(' ')}
                      placeholder=' '
                      name='title'
                      onChange={(e) => handleSnippetChange(e)}
                    />
                    <label className='form__label'>Title</label>
                  </div>
                  <div className='form__div'>
                    <input
                      ref={videoImageRef}
                      type='text'
                      className={[isFormValid['image'], 'form__input'].join(' ')}
                      placeholder=' '
                      name='url'
                      onChange={(e) => handleImageChange(e)}
                    />
                    <label className='form__label'>Image</label>
                  </div>
                  <div className='form__div'>
                    <select
                      ref={channelIdRef}
                      className={[isFormValid['channelId'], 'form__input'].join(' ')}
                      name='channelId'
                      defaultValue={''}
                      onChange={(e) => handleSnippetChange(e)}
                    >
                      <option value='' disabled>
                        Select an Option
                      </option>
                      {optionSelect.map((i) => (
                        <option key={i} value={i}>
                          {i}
                        </option>
                      ))}
                    </select>
                    <label className='form__label'>Channel id</label>
                  </div>
                  <div className='form__div'>
                    <input
                      ref={videoDescriptionRef}
                      type='text'
                      className={[isFormValid['description'], 'form__input'].join(' ')}
                      placeholder=' '
                      name='description'
                      onChange={(e) => handleSnippetChange(e)}
                    />
                    <label className='form__label'>Description</label>
                  </div>
                  {isLoading ? (
                    <input type='submit' disabled className='form__button disable' value={'loading...'} />
                  ) : (
                    <input type='submit' className='form__button' value={'ADD'} />
                  )}
                </form>
              </div>
            </div>
          </div>
          {hasError && <>something wrong</>}
          <ToastContainer />
        </React.Fragment>,
        document.body
      )
    : null;
}
