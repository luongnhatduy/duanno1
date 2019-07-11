import React, { PureComponent } from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import FlatListItem from './FlatListItem';

class FlatListAdvanced extends PureComponent {
  static propTypes = {
    pageSize: PropTypes.number,
    refreshing: PropTypes.bool,
    allowLoadMore: PropTypes.bool,
  };

  static defaultProps = {
    pageSize: 20,
    refreshing: false,
    allowLoadMore: false,
  };

  constructor(props) {
    super(props);
    this.state = {};
    this.rowRefs = [];
    this._onViewableItemsChanged = this._onViewableItemsChanged.bind(this);
    this.scrollToEnd = this.scrollToEnd.bind(this);
    this.scrollToIndex = this.scrollToIndex.bind(this);
    this.scrollToItem = this.scrollToItem.bind(this);
    this.scrollToOffset = this.scrollToOffset.bind(this);
  }

  getCurrentPage = () => Number((this.props.data.length / this.props.pageSize).toFixed());

  isEnded = () => {
    if (this.props.data.length % this.props.pageSize !== 0) {
      return true;
    }
    return false;
  };

  _onEndReached = () => {
    if (!this.onEndReachedCalledDuringMomentum) {
      this.onEndReachedCalledDuringMomentum = true;
      if (
        this.isEnded()
        || !this.props.allowLoadMore
        || this.props.data.length < this.props.pageSize
      ) { return; }
      const currentPage = Number((this.props.data.length / this.props.pageSize).toFixed());

      this.props.onLoadMore && this.props.onLoadMore(currentPage);
    }
  };

  _keyExtractor = (item, index) => index.toString();

  scrollToEnd(params?: ?{ animated?: ?boolean }) {
    if (this._listRef) {
      this._listRef.scrollToEnd(params);
    }
  }

  scrollToIndex(params: {
    animated?: ?boolean,
    index: number,
    viewOffset?: number,
    viewPosition?: number,
  }) {
    if (this._listRef) {
      this._listRef.scrollToIndex(params);
    }
  }

  scrollToOffset(params: { animated?: ?boolean, offset: number }) {
    if (this._listRef) {
      this._listRef.scrollToOffset(params);
    }
  }

  scrollToItem(params: { animated?: ?boolean, item: any, viewPosition?: number }) {
    if (this._listRef) {
      this._listRef.scrollToItem(params);
    }
  }

  _renderItem(data) {
    const view = this.props.renderItem(data);
    return (
      <FlatListItem
        ref={myItem => this._addRowRefs(myItem, data)}
        viewComponent={view}
        data={data}
      />
    );
  }

  _addRowRefs(ref, data) {
    this.rowRefs[data.index] = {
      ref,
      item: data.item,
      index: data.index,
    };
  }

  _updateItem(index, visibility) {
    if (!this.rowRefs[index].ref) {
      return false;
    }
    this.rowRefs[index].ref.setVisibility(visibility);
    return visibility;
  }

  _onViewableItemsChanged(info: {
    changed: Array<{
      key: string,
      isViewable: boolean,
      item: any,
      index: ?number,
      section?: any,
    }>,
  }) {
    info.changed.map(item => this._updateItem(item.index, item.isViewable));
  }

  render() {
    return (
      <FlatList
        ref={ref => {
          this._listRef = ref;
        }}
        keyExtractor={this._keyExtractor}
        onEndReached={this._onEndReached}
        onEndReachedThreshold={0.5}
        // ListFooterComponent={this._renderFooterComponent}
        {...this.props}
        renderItem={data => this._renderItem(data)}
        onMomentumScrollBegin={() => {
          this.onEndReachedCalledDuringMomentum = false;
        }}
        onViewableItemsChanged={this._onViewableItemsChanged}
      />
    );
  }
}

export default FlatListAdvanced;
