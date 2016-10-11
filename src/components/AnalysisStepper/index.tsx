import * as React from 'react';
import { List, ListItem } from 'material-ui/List';
import { pure } from 'recompose';

const classes = require('./style.scss');

interface AnalysisStepperProps {
  className?: string,
  steps: Step[];
  onStepMouseOver(symbol: string): __React.EventHandler<__React.MouseEvent>;
  onStepMouseOut(symbol: string): __React.EventHandler<__React.MouseEvent>;
  getStepState(step: Step): StepState;
  getStepValue(step: Step): number | undefined;
  removeLandmark(landmark: CephaloLandmark): void;
  editLandmark(landmark: CephaloLandmark): void;
}

import IconPlayArrow from 'material-ui/svg-icons/av/play-arrow';
import IconHourglass from 'material-ui/svg-icons/action/hourglass-empty';
import IconDone from 'material-ui/svg-icons/action/done';

const ICON_DONE       = <IconDone color="green"/>;
const ICON_CURRENT    = <IconPlayArrow color="blue" />;
const ICON_PENDING    = <IconHourglass />;
const ICON_EVALUATING = <IconHourglass className={classes.icon_pending__evaluating} />;

const icons: { [id: string]: JSX.Element } = {
  done: ICON_DONE,
  current: ICON_CURRENT,
  pending: ICON_PENDING,
  evaluating: ICON_EVALUATING,
};

import { descriptions } from './strings';

const getDescriptionForStep = (landmark: CephaloLandmark) => {
  return descriptions[landmark.symbol] || landmark.description || null;
}

const getTitleForStep = (landmark: CephaloLandmark) => {
  if (landmark.type === 'point') {
    return `Set point ${landmark.symbol}${ landmark.name ? ` (${landmark.name})` : '' }`;
  } else if (landmark.type === 'line') {
    return `Draw line ${landmark.symbol}${ landmark.name ? ` (${landmark.name})` : '' }`;
  } else if (landmark.type === 'angle') {
    return `Calculate angle ${landmark.symbol}${ landmark.name ? ` (${landmark.name})` : '' }`;
  } else if (landmark.type === 'distance') {
    return `Measure distance between points ${landmark.components[0].symbol} and ${landmark.components[1].symbol}`
  } else if (landmark.type === 'sum') {
    return `Calculate ${landmark.name || landmark.symbol || landmark.components.map(c => c.symbol).join(' + ')}`
  }
  console.warn('Could not get title for step of type ' + landmark.type);
  return undefined;
}

export const AnalysisStepper = pure((props: AnalysisStepperProps) => {
  const {
    steps,
    getStepState,
    getStepValue,
    removeLandmark, editLandmark,
    onStepMouseOver, onStepMouseOut,
  } = props;
  return (
    <List className={props.className}>
    {
      steps.map(step => {
        const value = getStepValue(step);
        const state = getStepState(step);
        const done = state === 'done';
        return (
          <div key={step.symbol}>
            <ListItem
              primaryText={getTitleForStep(step)}
              secondaryText={getDescriptionForStep(step) || undefined}
              leftIcon={icons[state]}
              rightIcon={ typeof value === 'number' ? <span>{value.toFixed(1)}</span> : undefined}
              onMouseEnter={done ? onStepMouseOver(step.symbol) : undefined}
              onMouseLeave={done ? onStepMouseOut(step.symbol) : undefined}
            />
          </div>
        );
      })
    }
    </List>
  );
});

export default AnalysisStepper;