import React from "react";
import { CardContent, Paper, ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails, List, ListItem } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { iOrder } from "../../store/archive/types";

interface iProps {
    currentOrder: iOrder;
}
export function Content(props: iProps) {
    const { description/* , priceMaterials , comments as notes*/ } = props.currentOrder

    return (
        <CardContent>
            <Paper style={{ padding: "10px", margin: "10px 0" }}>
                {description}
            </Paper>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Расходы</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {priceMaterials.map((item, index) => (
                            <ListItem key={index}>
                                <span>{item.note} </span>
                                <hr />
                                <span>{item.cost} </span>
                                <hr />
                                <span>{item.createdAt.toLocaleDateString()}</span>
                            </ListItem>
                        ))}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
            <ExpansionPanel>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>Заметки</ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List>
                        {notes.map((item, index) => (
                            <ListItem key={index}>
                                <span>{item.createdAt.toLocaleDateString()} </span>
                                <hr />
                                <span>{item.note} </span>
                            </ListItem>
                        ))}
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        </CardContent>
    )
}
const priceMaterials = [
    { cost: 5, note: 'asdasdasd', createdAt: new Date(2019, 2, 5) },
    { cost: 2, note: 'rgnnrtb', createdAt: new Date(2019, 2, 5) },
    { cost: 4, note: 'thnthnhn', createdAt: new Date(2019, 2, 5) }
]
const notes = [
    { note: 'asdasdasd', createdAt: new Date(2019, 2, 5) },
    { note: 'rgnnrtb', createdAt: new Date(2019, 2, 5) },
    { note: 'thnthnhn', createdAt: new Date(2019, 2, 5) }
]