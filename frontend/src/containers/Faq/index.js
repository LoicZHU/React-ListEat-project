import { connect } from 'react-redux';

import Faq from 'src/components/Faq';
import { openRestaurantContent, openClientContent } from 'src/actions/user';

const mapStateToProps = (state) => ({
  isRestaurantContentOpen: state.user.isRestaurantContentOpen,
  isClientContentOpen: state.user.isClientContentOpen,
});

const mapDispatchToProps = (dispatch) => ({
  openRestaurantContent: () => {
    dispatch(openRestaurantContent());
  },
  openClientContent: () => {
    dispatch(openClientContent());
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Faq);
