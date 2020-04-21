import { connect } from 'react-redux';

import Validation from 'src/components/Validation';
import { sendTicketValidation } from 'src/actions/ticket';

const mapStateToProps = (state) => ({
  restaurantName: state.tickets.restaurantName,
  ticketCutlery: state.tickets.ticketCutlery,
  ticketWaitingTime: state.tickets.ticketWaitingTime,
});

const mapDispatchToProps = (dispatch) => ({
  sendTicketValidation: (newValue) => {
    dispatch(sendTicketValidation(newValue));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Validation);
