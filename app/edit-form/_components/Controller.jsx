import React from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Themes from "../../_data/Themes";


const Controller = ({ selectedTheme }) => {
    return (
        <div>
            <h2 className="my-1">Select Theme</h2>
            <Select onValueChange={(value) => selectedTheme(value)}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder="Theme" />
                </SelectTrigger>
                <SelectContent>
                    {Themes.map((theme, index) => {
                        return (
                            <SelectItem key={index} value={theme.theme}>
                                <div className="flex gap-3">
                                    <div className="flex">
                                        <div className="h-5 w-5 rounded-l-md" style={{ backgroundColor: theme.primary }}></div>
                                        <div className="h-5 w-5" style={{ backgroundColor: theme.secondary }}></div>
                                        <div className="h-5 w-5" style={{ backgroundColor: theme.accent }}></div>
                                        <div className="h-5 w-5 rounded-r-md" style={{ backgroundColor: theme.neutral }}></div>
                                    </div>
                                    <div>{theme.theme}</div>
                                </div>
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>

        </div>
    );
};

export default Controller;