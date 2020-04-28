// import npm
import { connect } from 'react-redux';

// import
import CancellationByMail from 'src/components/CancellationByMail';
import { fetchTicketDataToCancel, cancelTicket } from 'src/actions/ticket';

const mapStateToProps = (state) => ({
  restaurantName: state.tickets.ticketInfoToCancel.restaurantName,
  ticketId: state.tickets.ticketInfoToCancel.ticketId,
  lastName: state.tickets.ticketInfoToCancel.lastName,
  firstName: state.tickets.ticketInfoToCancel.firstName,
  cutlery: state.tickets.ticketInfoToCancel.cutlery,
  estimatedEntryTime: state.tickets.ticketInfoToCancel.estimatedEntryTime,
  estimatedWaitingTime: state.tickets.ticketInfoToCancel.estimatedWaitingTime,
  ticketInfoLoaded: state.tickets.ticketInfoToCancel.ticketInfoLoaded,
  displayCancelConfirmation: state.tickets.ticketInfoToCancel.displayCancelConfirmation,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTicketDataToCancel: () => {
    dispatch(fetchTicketDataToCancel());
  },

  cancelTicket: () => {
    dispatch(cancelTicket());
  },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CancellationByMail);
