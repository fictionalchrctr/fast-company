import React from 'react'
import PropTypes from 'prop-types'

// GroupList = ProfessionList
// items = professions
// item = professiion
// [valueProperty] = ._id
// [contentProperty] = .name

const GroupList = ({
  items,
  valueProperty,
  contentProperty,
  onItemSelect,
  selectedItem
}) => {
  // console.log(items) // items - объект
  console.log(Object.keys(items)) // получаем МАССИВ ключей объекта items
  return (
    <ul className='list-group'>
      {Object.keys(items).map((item) => (
        <li
          key={items[item][valueProperty]}
          className={
            'list-group-item' + (items[item] === selectedItem ? ' active' : '')
          }
          onClick={() => onItemSelect(items[item])}
          role='button'
        >
          {items[item][contentProperty]}
        </li>
      ))}
    </ul>
  )
}
GroupList.defaultProps = {
  valueProperty: '_id',
  contentProperty: 'name'
}
GroupList.propTypes = {
  items: PropTypes.object.isRequired,
  valueProperty: PropTypes.string.isRequired,
  contentProperty: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func,
  selectedItem: PropTypes.object
}

export default GroupList
