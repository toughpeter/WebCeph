import assign from 'lodash/assign';
import createZoomWithWheel from './zoomWithWheel';
import { Cursor } from 'utils/constants';

import {
  addUnnamedManualLandmark,
  addManualLandmark,
  showTemporarilyHiddenLandmark,
  temporarilyHideLandmark,
} from 'actions/workspace';

import {
  getExpectedNextManualLandmark,
  isAnalysisComplete,
} from 'store/reducers/workspace/analysis';

export const createAddPoint: EditorToolCreator = (
  state: GenericState,
  dispatch: DispatchFunction,
) => (assign(
  createZoomWithWheel(state, dispatch),
  {
    onCanvasMouseEnter() {
      if (!isAnalysisComplete(state)) {
        // @TODO
      }
    },
    onCanvasMouseLeave() {
      // @TODO
    },
    onCanvasLeftClick(x, y) {
      const landmark = getExpectedNextManualLandmark(state);
      if (landmark !== null) {
        dispatch(addManualLandmark(landmark.symbol, { x, y }))
      } else {
        dispatch(addUnnamedManualLandmark({ x, y }));
      }
    },
    onLandmarkMouseEnter(symbol) {
      // dispatch(temporarilyHideLandmark(symbol));
    },
    onLandmarkMouseLeave(symbol) {
      // dispatch(showTemporarilyHiddenLandmark(symbol));
    },
    getCursorForCanvas() {
      return Cursor.ADD_LANDMARK;
    },
  } as EditorTool,
));

export default createAddPoint;