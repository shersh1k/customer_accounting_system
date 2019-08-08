import React from "react";
import { iOrder } from "../../store/orders/types";
import { Card, CardHeader, CardContent, List, ListItem } from "@material-ui/core";

interface iProps {
    order: iOrder;
    showedTab: string
}

interface iState {
}

export default class OrderCard extends React.Component<iProps, iState> {
    Title() {
        const { order/* , showedTab */ } = this.props;
        return (
            <span> Название: {order.title}, <span style={{ color: "red" }}>дней до дедлайна {this.countDaysToDeadLine(order.dateFinishWork)}</span></span>
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
        const { order, showedTab } = this.props
        return (
            <Card style={{ margin: "10px 5px" }}>
                <CardHeader title={this.Title()} />
                <CardContent>
                    <List>
                        <ListItem>
                            <span style={{ color: "blue" }}>Описание: {order.description}</span>
                        </ListItem>
                        <ListItem>
                            <span style={{ color: "red" }}>Цена материалов: {order.priceMaterials} </span>
                        </ListItem>
                        <ListItem>
                            <span style={{ color: "green" }}>Цена заказа: {order.priceOrder}</span>
                        </ListItem>
                        {(showedTab === "DateStartWork" || showedTab === "All") && (
                            <ListItem>
                                {order.dateStartWork && (
                                    <span style={{ color: "black" }}>
                                        Дата начала работы: {new Date(order.dateStartWork).toLocaleString()}
                                    </span>
                                )}
                            </ListItem>
                        )}
                        {(showedTab === "DateFinishWork" || showedTab === "All") && (
                            <ListItem>
                                {order.dateFinishWork && (
                                    <span style={{ color: "black" }}>
                                        Дата конца работы: {new Date(order.dateFinishWork).toLocaleString()}
                                    </span>
                                )}
                            </ListItem>
                        )}
                    </List>
                </CardContent>
            </Card>
        )
    }
}
