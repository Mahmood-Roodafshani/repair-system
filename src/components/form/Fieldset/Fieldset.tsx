import * as React from 'react';
import {AppBar} from "@mui/material";

export interface FieldsetProps extends React.HTMLAttributes<HTMLFieldSetElement> {
    legend?: React.ReactNode;
    LegendProps?: React.HTMLAttributes<HTMLLegendElement>;
    legendColor?: "light" | "dark",
}

export default class Fieldset extends React.Component<FieldsetProps> {

    render() {
        const {legend, LegendProps, children, legendColor = "dark", ...otherProps} = this.props;
        const legendStyle = (LegendProps ? LegendProps : {}).style;
        return (
            <fieldset {...otherProps} style={{
                backgroundColor: 'white',
                minWidth: 0,
                margin: 0,
                borderRadius: 10,
                padding: 10
            }}>
                {legend != null ? <legend {...LegendProps} style={{...legendStyle}}>
                    <AppBar position={'static'} sx={(theme) => ({
                        backgroundColor: legendColor == "dark" ? theme.palette.primary.main : theme.palette.primary.light,
                        // borderRadius: '0.25rem',
                        // color: '#fff',
                        // maxWidth: '9ch',
                        // p: '0.25rem',
                    })} style={{
                        position: 'relative',
                        padding: 10,
                        fontSize: 12,
                        borderRadius: 15,
                        paddingRight: 30,
                        paddingLeft: 30,
                        fontWeight: 'bold',
                        zIndex: 'inherit'
                    }}>{legend}</AppBar>
                </legend> : null}
                {children}
            </fieldset>
        );
    }
}
