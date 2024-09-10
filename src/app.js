import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Sidebar = ({ activeItem, setActiveItem }) => {
  const items = [
    { icon: "🎓", name: "Certificado de conclusión" },
    { icon: "🚫", name: "Insatisfacción x Abandono" },
  ];

  return (
    <div className="w-64 bg-gray-100 h-screen p-4">
      {items.map((item) => (
        <div
          key={item.name}
          className={`flex items-center p-2 mb-2 cursor-pointer ${
            activeItem === item.name ? "bg-blue-500 text-white" : "hover:bg-gray-200"
          } rounded`}
          onClick={() => setActiveItem(item.name)}
        >
          <span className="mr-2">{item.icon}</span>
          {item.name}
        </div>
      ))}
    </div>
  );
};

const InteractiveInterpretation = ({ interpretations, selectedAspect, setSelectedAspect }) => (
  <div className="bg-white p-6 rounded-lg shadow mt-6">
    <h3 className="text-xl font-semibold mb-4">Interpretación Interactiva del Análisis</h3>
    <div className="flex space-x-4 mb-4">
      {Object.keys(interpretations).map((aspect) => (
        <button
          key={aspect}
          onClick={() => setSelectedAspect(aspect)}
          className={`px-4 py-2 rounded ${selectedAspect === aspect ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
        >
          {aspect.charAt(0).toUpperCase() + aspect.slice(1)}
        </button>
      ))}
    </div>
    <p className="text-gray-700">{interpretations[selectedAspect]}</p>
  </div>
);

const ChiSquareTable = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow">
    <h3 className="text-xl font-semibold mb-4">Pruebas de chi-cuadrado</h3>
    <table className="w-full">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 text-left">Prueba</th>
          <th className="p-2 text-left">Valor</th>
          <th className="p-2 text-left">gl</th>
          <th className="p-2 text-left">Sig. asintótica (bilateral)</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
            <td className="p-2">{row.test}</td>
            <td className="p-2">{row.value}</td>
            <td className="p-2">{row.df}</td>
            <td className="p-2">{row.significance}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <p className="text-sm mt-2 text-gray-600">
      {data[0].note}
    </p>
  </div>
);

const CertificadoConclusionAnalysis = () => {
  const data = [
    { name: 'Strongly disagree', 'North America': 2.5, 'Latin America': 5.9 },
    { name: 'Disagree', 'North America': 6.9, 'Latin America': 3.8 },
    { name: 'Neither agree nor disagree', 'North America': 18.1, 'Latin America': 10.6 },
    { name: 'Agree', 'North America': 41.6, 'Latin America': 37.3 },
    { name: 'Strongly agree', 'North America': 30.8, 'Latin America': 42.4 },
  ];

  const [selectedAspect, setSelectedAspect] = useState('overall');

  const interpretations = {
    overall: "En general, se observa una tendencia positiva hacia la motivación proporcionada por los certificados de finalización. Tanto en América del Norte como en América Latina, la mayoría de los participantes están de acuerdo o muy de acuerdo con que un certificado los motiva más a completar el curso.",
    regional: "Existen diferencias notables entre las regiones. Los participantes de América Latina muestran una tendencia más fuerte a estar 'Muy de acuerdo' (42.4%) en comparación con América del Norte (30.8%). Esto sugiere que los certificados podrían ser un incentivo particularmente efectivo en América Latina.",
    disagreement: "El desacuerdo con la afirmación es relativamente bajo en ambas regiones, con solo un 9.4% en América del Norte y un 9.7% en América Latina en desacuerdo o muy en desacuerdo. Esto indica que la mayoría de los estudiantes valoran los certificados como motivadores.",
    neutral: "Hay un porcentaje significativo de respuestas neutras, especialmente en América del Norte (18.1%). Esto podría indicar que algunos estudiantes no están seguros del valor de los certificados o que otros factores son más importantes para su motivación."
  };

  const chiSquareData = [
    { test: "Chi-cuadrado de Pearson", value: "34.997ᵃ", df: "4", significance: "<.001" },
    { test: "Razón de verosimilitud", value: "35.456", df: "4", significance: "<.001" },
    { test: "Asociación lineal por lineal", value: "12.522", df: "1", significance: "<.001" },
    { test: "N de casos válidos", value: "1109", df: "", significance: "" },
  ];
  chiSquareData[0].note = "ᵃ 0 casillas (0.0%) han esperado un recuento menor que 5. El recuento mínimo esperado es 22.69.";

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Análisis de Certificado de Conclusión</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          Si la plataforma me ofrece un certificado de finalización del curso, me siento más motivado para completar
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="North America" fill="#8884d8" />
            <Bar dataKey="Latin America" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InteractiveInterpretation 
        interpretations={interpretations} 
        selectedAspect={selectedAspect} 
        setSelectedAspect={setSelectedAspect}
      />

      <ChiSquareTable data={chiSquareData} />
    </div>
  );
};

const InsatisfaccionAbandonoAnalysis = () => {
  const data = [
    { name: 'Strongly disagree', 'North America': 4.4, 'Latin America': 10.2 },
    { name: 'Disagree', 'North America': 17.3, 'Latin America': 22.3 },
    { name: 'Neither agree nor disagree', 'North America': 26.9, 'Latin America': 29.3 },
    { name: 'Agree', 'North America': 38.1, 'Latin America': 27.1 },
    { name: 'Strongly agree', 'North America': 13.3, 'Latin America': 11.2 },
  ];

  const [selectedAspect, setSelectedAspect] = useState('overall');

  const interpretations = {
    overall: "En general, se observa una tendencia mixta en cuanto a la disposición de los estudiantes a abandonar el curso si sienten que obtienen menos de lo esperado. Hay una distribución variada de respuestas en ambas regiones, lo que sugiere que este factor afecta de manera diferente a distintos grupos de estudiantes.",
    regional: "Existen algunas diferencias notables entre las regiones. Los estudiantes de América del Norte muestran una mayor tendencia a estar de acuerdo (38.1%) en comparación con los de América Latina (27.1%). Esto podría indicar que los estudiantes norteamericanos son más propensos a abandonar el curso si no cumple con sus expectativas.",
    disagreement: "Un porcentaje significativo en ambas regiones está en desacuerdo con la afirmación (21.7% en América del Norte y 32.5% en América Latina). Esto sugiere que muchos estudiantes están dispuestos a continuar el curso incluso si no cumple completamente con sus expectativas iniciales.",
    neutral: "Hay un porcentaje considerable de respuestas neutras en ambas regiones (26.9% en América del Norte y 29.3% en América Latina). Esto podría indicar que muchos estudiantes no están seguros de cómo reaccionarían en esta situación o que otros factores influyen en su decisión de continuar o abandonar el curso."
  };

  const chiSquareData = [
    { test: "Chi-cuadrado de Pearson", value: "28.255ᵃ", df: "4", significance: "<.001" },
    { test: "Razón de verosimilitud", value: "28.634", df: "4", significance: "<.001" },
    { test: "Asociación lineal por lineal", value: "12.205", df: "1", significance: "<.001" },
    { test: "N de casos válidos", value: "1109", df: "", significance: "" },
  ];
  chiSquareData[0].note = "ᵃ 0 casillas (0.0%) han esperado un recuento menor que 5. El recuento mínimo esperado es 39.95.";

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Análisis de Insatisfacción y Abandono</h2>
      
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-xl font-semibold mb-4">
          Si siento que lo que obtengo es menos de lo que pensé que obtendría cuando me inscribí, dejo el curso de inmediato
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="North America" fill="#8884d8" />
            <Bar dataKey="Latin America" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <InteractiveInterpretation 
        interpretations={interpretations} 
        selectedAspect={selectedAspect} 
        setSelectedAspect={setSelectedAspect}
      />

      <ChiSquareTable data={chiSquareData} />
    </div>
  );
};

const Dashboard = () => {
  const [activeItem, setActiveItem] = useState("Certificado de conclusión");

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />
      <div className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-8">Thesis Research</h1>
        {activeItem === "Certificado de conclusión" && <CertificadoConclusionAnalysis />}
        {activeItem === "Insatisfacción x Abandono" && <InsatisfaccionAbandonoAnalysis />}
      </div>
    </div>
  );
};

export default Dashboard;