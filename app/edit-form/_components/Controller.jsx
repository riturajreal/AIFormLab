'use client';
import React, { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Themes from "../../_data/Themes";
import GradientBg from "../../_data/GradientBg";
import { Button } from "../../../components/ui/button";


const Controller = ({ selectedTheme, selectedBackground }) => {
    const [showMore, setShowMore] = useState(6);
    return (
        <div>
            {/* theme selection controller */}
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
            {/* Background selection controller */}
            <h2 className='mt-8 my-1'>Select Background</h2>
            <div className="grid grid-cols-3 gap-5">
                {GradientBg.map((bg, index) => index < showMore && (
                    <div 
                        className="w-full h-[70px] rounded-lg cursor-pointer hover:border-black hover:border-2 flex justify-center items-center"
                        style={{ background: bg.gradient }}
                        onClick={() => selectedBackground(bg.gradient)}
                    >
                        {index == 0 && 'None'}
                    </div>
                ))}
            </div>

            <Button
                variant="ghost"
                size="sm"
                className="w-full mt-4"
                onClick={() => setShowMore(showMore > 6 ? 6 : 20)}
            >
                {" "}
                {showMore > 6 ? "Less" : "Show More"}
            </Button>
        </div>
    );
};

export default Controller;