import {StrictMode} from "react"
import ReactDOM from 'react-dom/client'

import App from './app/App.tsx'

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLDivElement);

root.render(
	<StrictMode>
		<App/>
	</StrictMode>,
)