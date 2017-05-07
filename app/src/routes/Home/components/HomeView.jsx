import React from "react";
import pure from "recompose/pure";
import PageHeader from "../../../components/PageHeader";
import "./HomeView.scss";

const enhance = pure;

export const HomeView = () => (
    <div className="home">
        <PageHeader
            title="Home"
        />
        <div style={{ padding: "32px" }}>To be implemented...</div>
    </div>
);

export default enhance(HomeView);
