import React from "react";
import { Card, CardContent, CardHeader, TextField, Grid, CircularProgress } from "@material-ui/core";
import { Button } from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker, MaterialUiPickersDate } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import ruLocale from "date-fns/locale/ru";
import { iOrder } from "../../store/order/types";
import newOrderClasses from "../../style/Order.module.scss";
import UIClasses from "../../style/UI.module.scss";
import { connect } from "react-redux";
import { State } from "../../store";
import { postOrder, handleChange } from "../../store/order/actions";
import { setList } from "../../store/orderLists/actions";
import { List } from './../OrderLists/List';

interface iProps {
  postOrder: Function;
  handleChange: Function;
  newOrder: iOrder;
  isPending: boolean;
  error: boolean;
  errorMessage?: string;
  list: iOrder[];
  setList: Function;
}

class NewOrder extends React.Component<iProps> {
  componentDidMount() {
    this.props.setList("LastTen");
  }

  onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    this.props.postOrder({ ...this.props.newOrder });
  };

  handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    this.props.handleChange(name, value);
  };

  handleDateChange = (date: MaterialUiPickersDate, name: string) => {
    this.props.handleChange(name, date);
  };

  submitButton() {
    return (
      <div className={UIClasses.fetcingWrapper}>
        <Button type="submit" variant="contained" color="primary" disabled={this.props.isPending}>
          Зарегистрировать
        </Button>
        {this.props.isPending && <CircularProgress size={24} className={UIClasses.fetching} />}
      </div>
    );
  }

  render() {
    const { title, description, dateOrder, dateDeadline, priceOrder } = this.props.newOrder;
    const commonProps = { disabled: this.props.isPending, required: true, fullWidth: true };
    return (
      <div>
        <form onSubmit={this.onSubmitRegister} className={newOrderClasses.main} autoComplete="off">
          <Card className={newOrderClasses.main}>
            <CardHeader
              className={newOrderClasses.header}
              title={title || "Новый заказ"}
              action={this.submitButton()}
            />
            <CardContent className={newOrderClasses.content}>
              <Grid container spacing={3} justify="space-around" alignContent="space-between">
                <Grid item xs={6}>
                  <TextField
                    {...commonProps}
                    onChange={this.handleInput}
                    value={title}
                    name="title"
                    label="Название заказа"
                    type="text"
                  />
                </Grid>
                <Grid item xs={2}>
                  <TextField
                    {...commonProps}
                    onChange={this.handleInput}
                    value={priceOrder}
                    name="priceOrder"
                    label="Цена"
                    type="number"
                  />
                </Grid>
                <Grid item xs={10}>
                  <TextField
                    {...commonProps}
                    onChange={this.handleInput}
                    value={description}
                    name="description"
                    label="Описание"
                    type="text"
                    multiline
                  />
                </Grid>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ruLocale}>
                  <Grid item xs={5}>
                    <DatePicker
                      {...commonProps}
                      onChange={date => this.handleDateChange(date, "dateOrder")}
                      value={dateOrder}
                      name="dateOrder"
                      label="Принят"
                      format="d MMMM yyyy"
                      maxDate={new Date()}
                      maxDateMessage="Вы из будущего? :)"
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <DatePicker
                      {...commonProps}
                      onChange={date => this.handleDateChange(date, "dateDeadline")}
                      value={dateDeadline}
                      name="dateDeadline"
                      label="Дедлайн"
                      format="d MMMM yyyy"
                      minDate={dateOrder || new Date()}
                      minDateMessage="Дедлайн не может быть раньше даты принятия заказа"
                    />
                  </Grid>
                </MuiPickersUtilsProvider>
                <div>***TODO: КТО заказал (новая сущность recipient)***</div>
              </Grid>
            </CardContent>
          </Card>
        </form>
        <div className="listLasts">
          Оставить только недавние
          <List list={this.props.list} showedTab="LastTen" isPending={this.props.isPending} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (store: State) => ({
  newOrder: store.order.newOrder,
  isPending: store.order.isPending,
  error: store.order.error,
  errorMessage: store.order.errorMessage,

  list: store.orderLists.list
});

const mapDispatchToProps = {
  postOrder: postOrder,
  handleChange: handleChange,
  setList: setList
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewOrder);
