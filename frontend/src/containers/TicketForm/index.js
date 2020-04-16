// import npm
import { connect } from 'react-redux';

// import
import TicketForm from 'src/components/TicketForm';
import { changeTicketInputValue, subscribeToWaitingList } from 'src/actions/ticket';

const mapStateToProps = (state) => ({
  lastName: state.tickets.ticketInscriptionInput.lastName,
  firstName: state.tickets.ticketInscriptionInput.firstName,
  email: state.tickets.ticketInscriptionInput.email,
  phone: state.tickets.ticketInscriptionInput.phone,
  cutlery: state.tickets.ticketInscriptionInput.cutlery,
});

const mapDispatchToProps = (dispatch) => ({
  changeTicketInputValue: (newValue, fieldName) => {
    dispatch(changeTicketInputValue(newValue, fieldName));
  },
  handleTicketSubscribe: () => {
    dispatch(subscribeToWaitingList());
  },
});

// export
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TicketForm);
