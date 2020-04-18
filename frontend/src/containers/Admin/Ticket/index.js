// import npm
import { connect } from 'react-redux';

// import
import Ticket from 'src/components/Admin/Ticket';
import {
  updateCurrentTicket
} from 'src/actions/ticket';

const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => ({
  updateCurrentTicket: (newValue) => {
    dispatch(updateCurrentTicket(newValue));
  },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Ticket);
