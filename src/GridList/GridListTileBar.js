// @flow weak

import React from 'react';
import type { Element } from 'react';
import classNames from 'classnames';
import withStyles from '../styles/withStyles';

export const styles = (theme: Object) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 48,
    background: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    fontFamily: theme.typography.fontFamily,
  },
  rootBottom: {
    bottom: 0,
  },
  rootTop: {
    top: 0,
  },
  rootWithSubtitle: {
    height: 68,
  },
  titleWrap: {
    flexGrow: 1,
    marginLeft: theme.mixins.gutters({}).paddingLeft,
    marginRight: theme.mixins.gutters({}).paddingRight,
    color: 'white',
    overflow: 'hidden',
  },
  titleWrapActionLeft: {
    marginLeft: 0,
  },
  titleWrapActionRight: {
    marginRight: 0,
  },
  title: {
    fontSize: 16,
    lineHeight: '24px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  subtitle: {
    fontSize: 12,
    lineHeight: 1,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  },
  actionIconPositionLeft: {
    order: -1,
  },
  childImg: {
    height: '100%',
    transform: 'translateX(-50%)',
    position: 'relative',
    left: '50%',
  },
});

type TitlePosition = 'top' | 'bottom';
type ActionPosition = 'left' | 'right';

type DefaultProps = {
  classes: Object,
  actionPosition: ActionPosition,
  titlePosition: TitlePosition,
};

export type Props = {
  /**
   * An IconButton element to be used as secondary action target
   * (primary action target is the tile itself).
   */
  actionIcon?: Element<any>,
  /**
   * Position of secondary action IconButton.
   */
  actionPosition?: ActionPosition,
  /**
   * Useful to extend the style applied to components.
   */
  classes?: Object,
  /**
   * @ignore
   */
  className?: string,
  /**
   * String or element serving as subtitle (support text).
   */
  subtitle?: string | Element<any>,
  /**
   * Title to be displayed on tile.
   */
  title: string | Element<any>,
  /**
   * Position of the title bar.
   */
  titlePosition?: TitlePosition,
};

function GridListTileBar(props: DefaultProps & Props) {
  const {
    actionIcon,
    actionPosition,
    classes,
    className: classNameProp,
    subtitle,
    title,
    titlePosition,
    ...other
  } = props;

  const actionPos = actionIcon && actionPosition;
  const className = classNames(
    classes.root,
    {
      [classes.rootBottom]: titlePosition === 'bottom',
      [classes.rootTop]: titlePosition === 'top',
      [classes.rootWithSubtitle]: subtitle,
    },
    classNameProp,
  );

  // Remove the margin between the title / subtitle wrapper, and the Action Icon
  const titleWrapClassName = classNames(classes.titleWrap, {
    [classes.titleWrapActionLeft]: actionPos === 'left',
    [classes.titleWrapActionRight]: actionPos === 'right',
  });

  return (
    <div className={className} {...other}>
      <div className={titleWrapClassName}>
        <div className={classes.title}>{title}</div>
        {subtitle ? <div className={classes.subtitle}>{subtitle}</div> : null}
      </div>
      {actionIcon ? (
        <div className={classNames({ [classes.actionIconPositionLeft]: actionPos === 'left' })}>
          {actionIcon}
        </div>
      ) : null}
    </div>
  );
}

GridListTileBar.defaultProps = {
  actionPosition: 'right',
  titlePosition: 'bottom',
};

export default withStyles(styles, { name: 'MuiGridListTileBar' })(GridListTileBar);
