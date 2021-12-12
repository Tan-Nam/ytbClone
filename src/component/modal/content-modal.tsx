import React from 'react';
import ReactDOM from 'react-dom';
import { modalProp } from '../../model/modal-prop';
import './content-modal.scss';

export function ContentModal(props: modalProp) {
  const { isShown, hide, headerContent, bodyContent, footerContent } = props;

  return isShown
    ? ReactDOM.createPortal(
        <React.Fragment>
          <div className='content-modal-overlay' />
          <div className='content-modal-wrapper'>
            <div className='content-modal-content'>
              <div className='content-modal-header'>
                <div className='content-modal-header__text'>{headerContent}</div>
                <button
                  type='button'
                  className='modal-close-button'
                  data-dismiss='modal'
                  aria-label='Close'
                  onClick={hide}
                >
                  <span aria-hidden='true'>&times;</span>
                </button>
              </div>
              <div className='content-modal-body'>{bodyContent}</div>
              <div className='content-modal-footer'>{footerContent}</div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
}
