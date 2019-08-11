import React from "react";
import { iOrder } from "../../../store/orders/types";
import { Card, CardHeader, CardContent, List, ListItem, CardActions, Button } from "@material-ui/core";
import AddComment from "@material-ui/icons/AddComment";
import AttachMoney from "@material-ui/icons/AttachMoney";
import Edit from "@material-ui/icons/Edit";
import Check from "@material-ui/icons/Check";
import { Link } from "react-router-dom";
import { iShowedTabs } from "..";

interface iProps {
    order: iOrder;
    showedTab: iShowedTabs
}

interface iState {
}

export default class OrderCard extends React.Component<iProps, iState> {
    Title() {
        const { order, showedTab } = this.props;
        return (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Link to={`/orders/${this.props.order.slug}`}>{order.title}</Link>
                {showedTab === "DateDeadline" && <div style={{ color: "red", fontSize: 20 }}>
                    Осталось {this.countDaysToDeadLine(order.dateDeadline)} дней
                </div>}
            </div>
        )
    }

    countDaysToDeadLine(deadline?: Date) {
        if (!deadline) return;
        deadline = new Date(deadline);
        let today = new Date();
        let dif = deadline.getTime() - today.getTime()
        return Math.floor(dif / (1000 * 60 * 60 * 24))
    }

    render() {
        const { order } = this.props
        return (
            <Card style={{ margin: "10px 5px" }}>
                <CardHeader title={this.Title()} />
                <CardContent>
                    <List>
                        <ListItem>
                            <span>{order.description}</span>
                        </ListItem>
                        <ListItem>
                            <span style={{ color: "blue" }}>TODO: Здесь буду заметки</span>
                        </ListItem>
                    </List>
                </CardContent>
                <CardActions>
                    <Button title="Добавить заметку"><AddComment /></Button>
                    <Button color="secondary" title="Добавить расход"><AttachMoney /></Button>
                    <Button><Edit /><Link to={`/orders/${this.props.order.slug}`}>Редактировать</Link></Button>
                    <Button color="primary">Выполнено<Check /></Button>
                </CardActions>
            </Card >
        )
    }
}
