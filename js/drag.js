'use strict';

(function () {

  var Border = {
    TOP: 130,
    RIGHT: 1135,
    BOTTOM: 630,
    LEFT: 0
  };

  var mainPin = document.querySelector('.map__pin--main');

  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    /**
     * @description Добавляет слушателя события движения мыши.
     * @param {Object} moveEvt Событие, возникающее при движении мыши с зажатой кнопкой.
     */
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (mainPin.offsetTop - shift.y < Border.TOP) {
        mainPin.style.top = Border.TOP + 'px';
      }

      if (mainPin.offsetTop - shift.y > Border.BOTTOM) {
        mainPin.style.top = Border.BOTTOM + 'px';
      }

      if (mainPin.offsetLeft - shift.x < Border.LEFT) {
        mainPin.style.left = Border.LEFT + 'px';
      }

      if (mainPin.offsetLeft - shift.x > Border.RIGHT) {
        mainPin.style.left = Border.RIGHT + 'px';
      }

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
    };

    /**
     * @description Удаляет слушателя события движения мыши.
     * @param {Object} upEvt Событие, возникающее при отпускании кнопки мыши.
     */
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      window.form.setAddress(window.drag.mainPin);

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.drag = {
    mainPin: mainPin,
  };

})();
