import { connect } from 'react-redux';

import Cancellation from 'src/components/Cancellation';

const mapStateToProps = (state) => ({
  restaurantUrlId: state.tickets.restaurantUrlId,
});

const mapDispatchToProps = () => ({

});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Cancellation);
