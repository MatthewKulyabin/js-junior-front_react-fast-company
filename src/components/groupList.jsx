import React from 'react';
import PropTypes from 'prop-types';

function GroupList({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem,
}) {
  let convertedItems = {};
  items instanceof Array &&
    items.forEach((item) => {
      convertedItems[item.name] = item;
    });
  return (
    <ul className="list-group">
      {Object.keys(items).map((item, idx) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item])}
          role="button"
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  );
}

GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name',
};

GroupList.propTypes = {
  // items: PropTypes.oneOfType(PropTypes.object, PropTypes.array),
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object,
};

export default GroupList;
