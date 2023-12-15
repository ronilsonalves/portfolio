import React from "react";

interface Props {
  currentPath: any;
}

const config = {
  client: process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID,
};

export default class Ads extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props) {
    console.log("entrou aqui no should update");
    setTimeout(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error(err);
        }
    }, 1000);
    this.componentDidUpdate();
    return this.props.currentPath !== nextProps.currentPath;
  }
  componentDidUpdate(): void {
    console.log("entrou aqui no did update");
    try {
      // @ts-ignore
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error(err);
    }
  }
  render(): React.ReactNode {
    return (
      <ins
        key={Math.random()}
        id={this.props.currentPath}
        className="adsbygoogle"
        style={{ display: "block", textAlign: "center" }}
        data-ad-client={config.client}
        data-ad-slot="8285876059"
        data-ad-layout="in-article"
        data-ad-format="fluid"
        data-full-width-responsive="true"
      ></ins>
    );
  }
}
