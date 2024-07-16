import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html lang="fr">
            <Head>
                <link rel="preconnect" href="https://app.snipcart.com" />
                <link rel="preconnect" href="https://cdn.snipcart.com" />
                <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.css" />
            </Head>
            <body>
                <Main />
                <NextScript />
                <script async src="https://cdn.snipcart.com/themes/v3.3.1/default/snipcart.js"></script>
                <div 
                    hidden 
                    id="snipcart" 
                    data-api-key="MDJkNDg4ZWYtYzdkZS00Mjg2LWE4NmItN2JjMjQ0ZDI4NWIyNjM4NTY2OTE1NzU1NDIzMzIz"
                    data-config-modal-style="side"
                ></div>
            </body>
        </Html>
    )
}