import React, { useEffect } from 'react';

const FlappyBird = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = `/flappy-bird/FlappyBird.js`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const GODOT_CONFIG = {
        args: [],
        canvasResizePolicy: 1,
        executable: "/flappy-bird/FlappyBird",
        experimentalVK: false,
        fileSizes: {
          "/flappy-bird/FlappyBird.pck": 820176,
          "/flappy-bird/FlappyBird.wasm": 35708238
        },
        focusCanvas: true,
        gdextensionLibs: []
      };

      const engine = new window.Engine(GODOT_CONFIG);

      const INDETERMINATE_STATUS_STEP_MS = 100;
      const statusProgress = document.getElementById('status-progress');
      const statusProgressInner = document.getElementById('status-progress-inner');
      const statusIndeterminate = document.getElementById('status-indeterminate');
      const statusNotice = document.getElementById('status-notice');

      let initializing = true;
      let statusMode = 'hidden';

      let animationCallbacks = [];
      function animate(time) {
        animationCallbacks.forEach((callback) => callback(time));
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);

      function animateStatusIndeterminate(ms) {
        const i = Math.floor((ms / INDETERMINATE_STATUS_STEP_MS) % 8);
        if (statusIndeterminate.children[i].style.borderTopColor === '') {
          Array.prototype.slice.call(statusIndeterminate.children).forEach((child) => {
            child.style.borderTopColor = '';
          });
          statusIndeterminate.children[i].style.borderTopColor = '#dfdfdf';
        }
      }

      function setStatusMode(mode) {
        if (statusMode === mode || !initializing) {
          return;
        }
        [statusProgress, statusIndeterminate, statusNotice].forEach((elem) => {
          elem.style.display = 'none';
        });
        animationCallbacks = animationCallbacks.filter((value) => (value !== animateStatusIndeterminate));
        switch (mode) {
          case 'progress':
            statusProgress.style.display = 'block';
            break;
          case 'indeterminate':
            statusIndeterminate.style.display = 'block';
            animationCallbacks.push(animateStatusIndeterminate);
            break;
          case 'notice':
            statusNotice.style.display = 'block';
            break;
          case 'hidden':
            break;
          default:
            throw new Error('Invalid status mode');
        }
        statusMode = mode;
      }

      function setStatusNotice(text) {
        while (statusNotice.lastChild) {
          statusNotice.removeChild(statusNotice.lastChild);
        }
        const lines = text.split('\n');
        lines.forEach((line) => {
          statusNotice.appendChild(document.createTextNode(line));
          statusNotice.appendChild(document.createElement('br'));
        });
      }

      function displayFailureNotice(err) {
        const msg = err.message || err;
        console.error(msg);
        setStatusNotice(msg);
        setStatusMode('notice');
        initializing = false;
      }

      const missing = window.Engine.getMissingFeatures();
      if (missing.length !== 0) {
        const missingMsg = 'Error\nThe following features required to run Godot projects on the Web are missing:\n';
        displayFailureNotice(missingMsg + missing.join('\n'));
      } else {
        setStatusMode('indeterminate');
        engine.startGame({
          'onProgress': function(current, total) {
            if (total > 0) {
              statusProgressInner.style.width = `${(current / total) * 100}%`;
              setStatusMode('progress');
              if (current === total) {
                setTimeout(() => {
                  setStatusMode('indeterminate');
                }, 500);
              }
            } else {
              setStatusMode('indeterminate');
            }
          }
        }).then(() => {
          setStatusMode('hidden');
          initializing = false;
        }, displayFailureNotice);
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <div className="h-full w-full flex items-center justify-center select-none">
        <canvas id="canvas" className='focus:outline-none'>
          HTML5 canvas appears to be unsupported in the current browser.<br />
          Please try updating or use a different browser.
        </canvas>
        <div id="status">
          <div id="status-progress" style={{ display: 'none' }} onContextMenu={(e) => e.preventDefault()}>
            <div id="status-progress-inner"></div>
          </div>
          <div id="status-indeterminate" style={{ display: 'none' }} onContextMenu={(e) => e.preventDefault()}>
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
          </div>
          <div id="status-notice" className="godot" style={{ display: 'none' }}></div>
        </div>
      </div>
    </>
  );
};

export default FlappyBird;

