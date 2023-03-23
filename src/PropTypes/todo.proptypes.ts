import PropTypes from 'prop-types'

export const TodoTypes = PropTypes.shape({
  id: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired
})